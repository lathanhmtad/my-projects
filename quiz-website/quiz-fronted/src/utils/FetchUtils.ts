import { store } from '../redux/store';

export interface RequestParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
  search?: string;
  all?: boolean;
}

export interface ListResponse<O = unknown> {
  content: O[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  description: string;
}

type BasicRequestParams = Record<string, string | number | null | boolean>

class FetchUtils {
  static async getAll<O>(resourceUrl: string, requestParams?: RequestParams): Promise<ListResponse<O>> {
    const response = await fetch(FetchUtils.concatParams(resourceUrl, { ...requestParams }));
    if (response.ok) {
      return await response.json();
    }
    throw await response.json();
  }

  static async getById<O>(resourceUrl: string, entityId: number): Promise<O> {
    const response = await fetch(`${resourceUrl}/${entityId}`);
    if (response.ok) {
      return await response.json();
    }
    throw await response.json();
  }

  static async getWithToken<O>(resourceUrl: string, requestParams?: BasicRequestParams): Promise<O> {
    const accessToken = this.getAccessToken();

    const response = await fetch(FetchUtils.concatParams(resourceUrl, requestParams), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok)
      throw await response.json();
    return await response.json();
  }

  static async post<I, O>(resourceUrl: string, requestBody: I): Promise<O> {
    const response = await fetch(resourceUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  static async deleteById<T>(resourceUrl: string, entityId: T): Promise<void> {
    const response = await fetch(resourceUrl + '/' + entityId, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw await response.json();
    }
  }

  static async deleteByIds<T>(resourceUrl: string, entityIds: T[]): Promise<void> {
    const response = await fetch(resourceUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entityIds)
    });
    if (!response.ok)
      throw await response.json();
  }

  private static concatParams = (url: string, requestParams?: BasicRequestParams): string => {
    if (requestParams) {
      const filteredRequestParams: Record<string, string> = {};

      for (const [key, value] of Object.entries(requestParams)) {
        if (value !== null && String(value).trim() !== '') {
          filteredRequestParams[key] = String(value);
        }
      }

      if (Object.keys(filteredRequestParams).length === 0) {
        return url;
      }

      const queryString: string = new URLSearchParams(filteredRequestParams).toString();
      return url + '?' + queryString;
    }
    return url;
  };

  private static getAccessToken = (): string => {
    const state = store.getState();
    return state.auth.accessToken || '';
  };
}

export default FetchUtils;