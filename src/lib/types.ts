export type SearchParam = string | string[] | undefined;

export type WithSearchParams<T = unknown> = T & {
  searchParams: Promise<Record<string, SearchParam>>;
};
