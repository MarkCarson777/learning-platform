import { useQuery } from "@tanstack/react-query";
import { getAllModules, getModule } from "../services/content";

export const useModules = () => {
  return useQuery({
    queryKey: ["modules"],
    queryFn: getAllModules,
    staleTime: Infinity,
  });
};

export const useModule = (moduleId: string) => {
  return useQuery({
    queryKey: ["module", moduleId],
    queryFn: () => getModule(moduleId),
    staleTime: Infinity,
    enabled: !!moduleId,
  });
};
