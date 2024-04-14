// Helper type
type ValueOf<T> = T[keyof T];

export const getRepos = () => {
  return $fetch("/api/repos");
};

export type Repos = Awaited<ReturnType<typeof getRepos>>;
export type Repo = ValueOf<Repos>;
