import { useModules } from "./hooks/useModules";

export const App = () => {
  const { data: modules, isLoading, error } = useModules();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <pre>{JSON.stringify(modules, null, 2)}</pre>;
};
