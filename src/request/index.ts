import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/',
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);

const request = <T = unknown>(config: AxiosRequestConfig) =>
  service.request<T>(config).then((res) => res.data);

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ ...config, url, method: 'get' });

export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => request<T>({ ...config, url, data, method: 'post' });

export const put = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => request<T>({ ...config, url, data, method: 'put' });

export const patch = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => request<T>({ ...config, url, data, method: 'patch' });

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ ...config, url, method: 'delete' });

export default service;
