import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
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
      unitId: data.unitId,
      chunkId: data.chunkId,
      completedAt: data.completedAt,
      flashcardResults: data.flashcardResults ?? [],
    };
  },
};

export const saveProgress = async (
  userId: string,
  unitId: string,
  chunkId: number,
  progress: Partial<UserProgress>,
) => {
  const ref = doc(db, "users", userId, "progress", `${unitId}_${chunkId}`);
  await setDoc(ref, { userId, unitId, chunkId, ...progress }, { merge: true });
};

export const getProgress = async (
  userId: string,
  unitId: string,
): Promise<UserProgress[]> => {
  const ref = collection(db, "users", userId, "progress").withConverter(
    progressConverter,
  );
  const q = query(ref, where("unitId", "==", unitId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};
