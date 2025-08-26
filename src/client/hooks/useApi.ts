"use client";

import { useMemo } from "react";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type Json =
  | Record<string, unknown>
  | Array<unknown>
  | string
  | number
  | boolean
  | null;

interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message:
        (data && (data.error?.message || data.message)) || response.statusText,
      details: data?.error || data,
    };
    throw error;
  }

  // Return full payload to allow access to data and meta consistently
  return data as T;
}

export function useApiQuery<TData = unknown>(
  key: unknown[],
  path: string,
  options?: Omit<
    UseQueryOptions<TData, ApiError, TData, unknown[]>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, ApiError> {
  const query = useQuery<TData, ApiError, TData, unknown[]>({
    queryKey: key,
    queryFn: () => fetchJson<TData>(path),
    staleTime: 60_000,
    ...options,
  });
  return query;
}

export function useApiMutation<TInput extends Json, TOutput = unknown>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  options?: UseMutationOptions<TOutput, ApiError, TInput>,
) {
  const mutation = useMutation<TOutput, ApiError, TInput>({
    mutationFn: async (body: TInput) =>
      fetchJson<TOutput>(path, {
        method,
        body: method === "DELETE" ? undefined : JSON.stringify(body),
      }),
    ...options,
  });
  return mutation;
}

export function useApiUrl(path: string): string {
  // Future: prefix with env base URL for SSR/edge if needed
  return useMemo(() => path, [path]);
}
