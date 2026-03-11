import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import usePagination from "@hooks/usePagination";
import { getAllUsers } from "@actions/user";

import type { UserModelType } from "@utils/types/models/user";

const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data, meta, loading, page, limit, setPage, setLimit, refresh } = usePagination<UserModelType>(
    async (currentPage, currentLimit) => {
      return await getAllUsers({
        page: currentPage,
        limit: currentLimit,
        returnType: "full",
      });
    },
    { page: 1, limit: 15 }
  );

  useEffect(() => {
    refresh();
  }, []);

  const handleEditUser = (user: UserModelType) => {
    navigate(`/dashboard/admin/users/edit/${user._id}`);
  };

  const filteredData = searchTerm
    ? data.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user._id?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return {
    users: filteredData,
    handleEditUser,
    setSearchTerm,
    searchTerm,
    setLimit,
    loading,
    setPage,
    page,
    limit,
    meta,
  };
};

export default useUsers;