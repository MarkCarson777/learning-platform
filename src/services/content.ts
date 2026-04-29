import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Module } from "../types/content";

export const getModule = async (moduleId: string): Promise<Module> => {
  const ref = doc(db, "nodules", moduleId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error(`Module ${moduleId} not found`);
  }

  return { id: snapshot.id, ...snapshot.data() } as Module;
};

export const getAllModules = async (): Promise<Module[]> => {
  const ref = collection(db, "modules");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Module);
};
