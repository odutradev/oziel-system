const STORAGE_PREFIX = 'digitalprove_file_';

interface StoredFile {
  blob: Blob;
  metadata: {
    name: string;
    type: string;
    size: number;
  };
}

class FileStorage {
  private dbName = 'digitalprove_files_db';
  private storeName = 'files';
  private db: IDBDatabase | null = null;

  private async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async saveFile(proveId: number, file: File): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const storedFile: StoredFile = {
        blob: file,
        metadata: {
          name: file.name,
          type: file.type,
          size: file.size,
        },
      };

      return new Promise((resolve, reject) => {
        const request = store.put(storedFile, `${STORAGE_PREFIX}${proveId}`);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error saving file to IndexedDB:', error);
      this.fallbackToSessionStorage(proveId, file);
    }
  }

  async getFile(proveId: number): Promise<File | null> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);

      return new Promise((resolve, _reject) => {
        const request = store.get(`${STORAGE_PREFIX}${proveId}`);
        request.onsuccess = () => {
          const result = request.result as StoredFile | undefined;
          if (result) {
            const file = new File([result.blob], result.metadata.name, {
              type: result.metadata.type,
            });
            resolve(file);
          } else {
            resolve(this.fallbackGetFromSessionStorage(proveId));
          }
        };
        request.onerror = () => {
          console.error('Error getting file from IndexedDB');
          resolve(this.fallbackGetFromSessionStorage(proveId));
        };
      });
    } catch (error) {
      console.error('Error accessing IndexedDB:', error);
      return this.fallbackGetFromSessionStorage(proveId);
    }
  }

  async removeFile(proveId: number): Promise<void> {
    const key = `${STORAGE_PREFIX}${proveId}`;
    
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error removing file from IndexedDB:', error);
    }
    
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing file from sessionStorage:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
    }

    try {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }

  private fallbackToSessionStorage(proveId: number, file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const data = {
        base64: reader.result as string,
        name: file.name,
        type: file.type,
        size: file.size,
      };
      try {
        sessionStorage.setItem(
          `${STORAGE_PREFIX}${proveId}`,
          JSON.stringify(data)
        );
      } catch (e) {
        console.error('SessionStorage also failed:', e);
      }
    };
    reader.readAsDataURL(file);
  }

  private fallbackGetFromSessionStorage(proveId: number): File | null {
    try {
      const data = sessionStorage.getItem(`${STORAGE_PREFIX}${proveId}`);
      if (!data) return null;

      const parsed = JSON.parse(data);
      const base64Response = fetch(parsed.base64);
      base64Response.then((res) => res.blob()).then((blob) => {
        return new File([blob], parsed.name, { type: parsed.type });
      });

      const byteString = atob(parsed.base64.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new File([ab], parsed.name, { type: parsed.type });
    } catch (error) {
      console.error('Error getting from sessionStorage:', error);
      return null;
    }
  }
}

export const fileStorage = new FileStorage();