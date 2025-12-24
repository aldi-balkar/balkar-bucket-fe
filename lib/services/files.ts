import Helper from "../api";

// GET /files
export function getFiles(bucketId = "", page = 1, limit = 20) {
  return Helper.fetchWrapper(`/files?bucketId=${bucketId}&page=${page}&limit=${limit}`, "GET");
}

// GET /files/:id
export function getFileDetail(id: string) {
  return Helper.fetchWrapper(`/files/${id}`, "GET");
}

// POST /files (upload)
export function uploadFiles(formData: FormData) {
  return Helper.uploadFile(`/files`, formData);
}

// DELETE /files/:id
export function deleteFile(id: string) {
  return Helper.fetchWrapper(`/files/${id}`, "DELETE");
}
