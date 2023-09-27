import type { OperationVariables, QueryOptions } from "@apollo/client";
import type { AsyncData } from "nuxt/dist/app/composables";

type TQuery<T> = QueryOptions<OperationVariables, T>["query"];
type TVariables<T> = QueryOptions<OperationVariables, T>["variables"];
type TAsyncQuery<T> = {
  query: TQuery<T>;
  variables?: TVariables<T>;
  key?: string;
  cache?: boolean;
};

export function useCMSAsyncQuery<T>(opts: TAsyncQuery<T>): AsyncData<T, Error>;
export function useCMSAsyncQuery<T>(query: TQuery<T>): AsyncData<T, Error>;
export function useCMSAsyncQuery<T>(
  query: TQuery<T>,
  variables?: TVariables<T>
): AsyncData<T, Error>;

export function useCMSAsyncQuery<T>(
  ...args: [TAsyncQuery<T>] | [TQuery<T>] | [TQuery<T>, TVariables<T>?]
) {
  if ("query" in args[0]) {
    return useAsyncQuery({
      ...args[0],
      clientId: "cms", // pass cms
    });
  }
  // pass cms as clientId
  // TODO: typescript issue
  return useAsyncQuery<T>(...args, "cms");
}
