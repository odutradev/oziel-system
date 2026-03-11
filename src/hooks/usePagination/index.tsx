import { useCallback, useEffect, useRef, useState } from 'react';

import type { PaginationMeta, PaginationOptions, PaginationOrError } from '@utils/types/action';
import type { UsePaginationResult } from './types';

const usePagination = <T,>(
  fetchFn: (page: number, limit: number, signal?: AbortSignal) => PaginationOrError<T>,
  { page: initialPage = 1, limit: initialLimit = 10 }: PaginationOptions = {}
): UsePaginationResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ limit: initialLimit, page: initialPage, pages: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const fetchRef = useRef(fetchFn);

  useEffect(() => {
    fetchRef.current = fetchFn;
  }, [fetchFn]);

  const fetchData = useCallback(async (currentPage: number, currentLimit: number, signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchRef.current(currentPage, currentLimit, signal);
      if (signal?.aborted) return;

      if ('error' in result) {
        setData([]);
        setMeta((prev) => ({ ...prev, limit: currentLimit, page: currentPage, pages: 0, total: 0 }));
        setError(result.error);
      } else {
        setData(result.data);
        setMeta(result.meta);
      }
    } catch (err) {
      if (signal?.aborted) return;
      setError('Unexpected error');
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchData(page, limit, controller.signal);
    return () => controller.abort();
  }, [page, limit, fetchData]);

  const refresh = useCallback(() => {
    void fetchData(page, limit);
  }, [fetchData, page, limit]);

  return { data, error, limit, loading, meta, page, refresh, setLimit, setPage };
};

export default usePagination;