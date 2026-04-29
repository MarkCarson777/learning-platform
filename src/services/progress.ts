import {
  doc,
  setDoc,
  getDoc,
  type FirestoreDataConverter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserProgress } from "../types/progress";

const progressConverter: FirestoreDataConverter<UserProgress> = {
  toFirestore(progress: UserProgress): DocumentData {
    return progress;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): UserProgress {
    const data = snapshot.data();
    return {
      userId: data.userId,
      moduleId: data.moduleId,
      chunkId: data.chunkId,
      completedAt: data.completedAt,
      flashcardResults: data.flashcardResults ?? [],
    };
  },
};

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
