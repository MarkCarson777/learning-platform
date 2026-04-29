import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Module } from "../types/content";
import type { UserProgress } from "../types/progress";

const moduleConverter: FirestoreDataConverter<Module> = {
  toFirestore: (module: Module) => {
    return module;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): Module => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      module: data.module,
      course: data.course,
      type: data.type,
      chunks: data.chunks,
    };
  },
};

export const getModule = async (moduleId: string): Promise<Module> => {
  const ref = doc(db, "nodules", moduleId).withConverter(moduleConverter);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error(`Module ${moduleId} not found`);
  }

  return snapshot.data();
};

export const getAllModules = async (): Promise<Module[]> => {
  const ref = collection(db, "modules").withConverter(moduleConverter);
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => doc.data());
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
    {
      ...progress,
      userId,
      moduleId,
      chunkId,
    },
    { merge: true },
  );
};

export const getProgress = async (userId: string, moduleId: string) => {
  const ref = doc(db, "users", userId, "progress", moduleId);
  const snap = await getDoc(ref);

  return snap.exists() ? (snap.data() as UserProgress) : null;
};
