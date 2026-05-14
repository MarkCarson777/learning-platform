import { useQuery } from "@tanstack/react-query";
import { getAllUnits, getUnit, getUnitsByModule } from "../services/content";

export const useUnits = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: getAllUnits,
    staleTime: Infinity,
  });
};

export const useUnit = (unitId: string) => {
  return useQuery({
    queryKey: ["unit", unitId],
    queryFn: () => getUnit(unitId),
    staleTime: Infinity,
    enabled: !!unitId,
  });
};

export const useUnitsByModule = (moduleId: string) => {
  return useQuery({
    queryKey: ["units", "module", moduleId],
    queryFn: () => getUnitsByModule(moduleId),
    staleTime: Infinity,
    enabled: !!moduleId,
  });
};
