// Helper type
type ValueOf<T> = T[keyof T];
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const getRepos = () => {
  return $fetch("/api/repos");
};

export type Repos = Awaited<ReturnType<typeof getRepos>>;
export type Repo = ArrayElement<Repos>;
