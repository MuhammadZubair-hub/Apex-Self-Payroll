import axios, { AxiosResponse, Method } from 'axios';
import { showThemedMessage } from '../utils/flashMessage';
import { getColors } from '../theme/color/theme';
import { store } from '../redux/store';

export interface ApiCallOptions {
  endpoint: string;
  method: Method;
  params?: Record<string, any>;
  data?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  // Pass true when the caller already shows its own error message on `!success` (e.g. form
  // submits with a "Failed to submit X" toast), so the user doesn't see two toasts for one failure.
  silent?: boolean;
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
  data,
  headers = {},
  silent = false,
}: ApiCallOptions): Promise<ApiCallResponse<T>> => {
  const isGet = method.toUpperCase() === 'GET';
  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

  const defaultHeaders: Record<string, string> = {};
  if (!isGet && !isFormData) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const option: any = {
    method,
    url: endpoint,
    params,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  if (!isGet && data !== undefined && data !== null && (isFormData || Object.keys(data).length > 0)) {
    option.data = data;
  }

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
console.log('error:',error)
    // Only screens that don't already show their own failure message rely on this - callers
    // that check `!result.success` and show a specific toast pass `silent: true` to avoid
    // showing the error twice.
    if (!silent) {
      const isDarkMode = store.getState().theme.isDarkMode;
      const colors = getColors(isDarkMode ? 'dark' : 'light');

      showThemedMessage(colors, {
        message: error.message === 'Network Error' ? 'No internet connection' : 'Something went wrong',
        description: error.message === 'Network Error' ? undefined : message,
        type: 'danger',
      });
    }

    return {
      success: false,
      status: statusCode,
      data: error?.response?.data || {},
      message,
    };
  }
};
