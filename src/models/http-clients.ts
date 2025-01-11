export interface RequestParams {
  headers?: Record<string, string>;
  query?: Record<string, any>;
  body?: any;
}

export class HttpClient<SecurityDataType = unknown> {
  private baseUrl: string = "http://localhost:3000";

  protected async request<T = any, E = any>({
    path,
    method,
    headers,
    query,
    body,
  }: RequestParams & { path: string; method: string }): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (query) {
      Object.keys(query).forEach((key) =>
        url.searchParams.append(key, query[key])
      );
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
