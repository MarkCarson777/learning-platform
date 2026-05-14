import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getProgress, saveProgress } from "../services/progress";
import type { UserProgress } from "../types/progress";

export const useProgress = (unitId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["progress", user?.uid, unitId],
    queryFn: () => {
      if (!user) throw new Error("No authenticated user");
      return getProgress(user.uid, unitId);
    },
    enabled: !!user && !!unitId,
  });

  const mutation = useMutation({
    mutationFn: (data: {
      chunkId: number;
      progress: Partial<UserProgress>;
    }) => {
      if (!user) throw new Error("No authenticated user");
      return saveProgress(user.uid, unitId, data.chunkId, data.progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["progress", user?.uid, unitId],
      });
    },
  });

  return {
    ...query,
    saveProgress: mutation.mutate,
    isSaving: mutation.isPending,
  };
};
