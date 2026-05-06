import type { Module } from "../types/content";

export interface ModuleGroup {
  groupId: string;
  modules: Module[];
}

export const groupModules = (modules: Module[]): ModuleGroup[] => {
  const grouped = modules.reduce(
    (acc, module) => {
      const key = module.moduleGroup ?? module.id;

      if (!acc[key]) acc[key] = [];
      acc[key].push(module);

      return acc;
    },
    {} as Record<string, Module[]>,
  );

  return Object.entries(grouped).map(([groupId, modules]) => ({
    groupId,
    modules: modules.sort(
      (a, b) => (a.moduleGroupOrder ?? 0) - (b.moduleGroupOrder ?? 0),
    ),
  }));
};
