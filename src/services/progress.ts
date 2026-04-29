import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { UserProgress } from "../types/progress";

export const saveProgress = async (
  userId: string,
  moduleId: string,
  chunkId: number,
  progress: Partial<UserProgress>,
) => {
  const ref = doc(db, "users", userId, "progress", `${moduleId}_${chunkId}`);

  await setDoc(
    ref,
    { userId, moduleId, chunkId, ...progress },
    { merge: true },
  );
};

export const getProgress = async (userId: string, moduleId: string) => {
  const ref = doc(db, "users", userId, "progress", moduleId);
  const snap = await getDoc(ref);

  return snap.exists() ? (snap.data() as UserProgress) : null;
};
