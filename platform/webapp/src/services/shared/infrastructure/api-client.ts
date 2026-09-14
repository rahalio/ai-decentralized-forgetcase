export type ApiResponse<T> = { data: T; meta?: Record<string, unknown> };

const API_KEY =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env
    ?.VITE_API_KEY ?? 'forgetcase_demo_local_dev_key';

async function request<T>(
  method: string,
  url: string,
  options?: { body?: unknown; signal?: AbortSignal },
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    method,
    signal: options?.signal,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      ...(method !== 'GET' ? { 'Idempotency-Key': crypto.randomUUID() } : {}),
    },
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${url} failed (${res.status}): ${text}`);
  }
  if (res.status === 204) {
    return { data: undefined as T };
  }
  return (await res.json()) as ApiResponse<T>;
}

export const apiClient = {
  get: <T>(url: string, opts?: { signal?: AbortSignal }) =>
    request<T>('GET', url, opts),
  post: <T>(url: string, opts?: { body?: unknown; signal?: AbortSignal }) =>
    request<T>('POST', url, opts),
  patch: <T>(url: string, opts?: { body?: unknown; signal?: AbortSignal }) =>
    request<T>('PATCH', url, opts),
};
