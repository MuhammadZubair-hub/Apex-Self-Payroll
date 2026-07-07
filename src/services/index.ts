import axios, { AxiosResponse, Method } from 'axios';

export interface ApiCallOptions {
  endpoint: string;
  method: Method;
  params?: Record<string, any>;
  data?: Record<string, any> | FormData;
  headers?: Record<string, string>;
}

export interface ApiCallResponse<T = any> {
  success: boolean;
  status: number;
  data: T;
  message?: string;
}

// Every screen's service (see e.g. HomeService, LeaveService) calls through this so there is one
// place that talks axios - screens/hooks never import axios directly. Query params are expected
// to already be part of `endpoint` (e.g. `${baseUrl}${endPoints.X}?EmployeeId=${id}`) rather than
// passed via `params`, matching how every endpoint in this app is actually called.
export const apicall = async <T = any>({
  endpoint,
  method,
  params = {},
  data = {},
  headers = {},
}: ApiCallOptions): Promise<ApiCallResponse<T>> => {
  const option = {
    method,
    url: endpoint,
    params,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response: AxiosResponse<T> = await axios.request(option);

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    const statusCode = error?.response?.status || 500;
    const message =
      error?.response?.data?.message || error.message || 'Something went wrong';
    console.log('The error calling API is:', error?.response?.data || message);

    return {
      success: false,
      status: statusCode,
      data: error?.response?.data || {},
      message,
    };
  }
};
