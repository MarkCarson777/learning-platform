import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getProgress, saveProgress } from "../services/progress";
import type { UserProgress } from "../types/progress";

export const useProgress = (moduleId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["progress", user?.uid, moduleId],
    queryFn: () => getProgress(user!.uid, moduleId),
    enabled: !!user, // only runs when user is logged in
  });

  const mutation = useMutation({
    mutationFn: (data: { chunkId: number; progress: Partial<UserProgress> }) =>
      saveProgress(user!.uid, moduleId, data.chunkId, data.progress),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["progress", user?.uid, moduleId],
      });
    },
  });

  return { ...query, saveProgress: mutation.mutate };
};
