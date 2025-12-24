import Helper from "../api";

// GET /buckets
export function getBuckets(page = 1, limit = 10) {
  return Helper.fetchWrapper(`/buckets?page=${page}&limit=${limit}`, "GET");
}

// GET /buckets/:id
export function getBucketDetail(id: string) {
  return Helper.fetchWrapper(`/buckets/${id}`, "GET");
}

// POST /buckets
export function createBucket(data: any) {
  return Helper.fetchWrapper(`/buckets`, "POST", data);
}

// PUT /buckets/:id
export function updateBucket(id: string, data: any) {
  return Helper.fetchWrapper(`/buckets/${id}`, "PUT", data);
}

// DELETE /buckets/:id
export function deleteBucket(id: string) {
  return Helper.fetchWrapper(`/buckets/${id}`, "DELETE");
}
