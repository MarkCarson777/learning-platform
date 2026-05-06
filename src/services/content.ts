import {
  collection,
  doc,
  getDoc,
  getDocs,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Module } from "../types/content";

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
      moduleGroup: data.moduleGroup,
      moduleGroupOrder: data.moduleGroupOrder,
    };
  },
};

export const getModule = async (moduleId: string): Promise<Module> => {
  const ref = doc(db, "modules", moduleId).withConverter(moduleConverter);
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
