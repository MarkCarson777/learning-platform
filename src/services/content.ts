import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Module, Unit } from "../types/content";

const moduleConverter: FirestoreDataConverter<Module> = {
  toFirestore: (module: Module) => module,
  fromFirestore: (snapshot: QueryDocumentSnapshot): Module => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      order: data.order,
      unitIds: data.unitIds,
    };
  },
};

const unitConverter: FirestoreDataConverter<Unit> = {
  toFirestore: (unit: Unit) => unit,
  fromFirestore: (snapshot: QueryDocumentSnapshot): Unit => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      moduleId: data.moduleId,
      type: data.type,
      order: data.order,
      chunks: data.chunks,
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

export const getUnit = async (unitId: string): Promise<Unit> => {
  const ref = doc(db, "units", unitId).withConverter(unitConverter);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error(`Unit ${unitId} not found`);
  }

  return snapshot.data();
};

export const getAllUnits = async (): Promise<Unit[]> => {
  const ref = collection(db, "units").withConverter(unitConverter);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
};

export const getUnitsByModule = async (moduleId: string): Promise<Unit[]> => {
  const ref = collection(db, "units").withConverter(unitConverter);
  const q = query(ref, where("moduleId", "==", moduleId));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => doc.data())
    .sort((a, b) => a.order - b.order);
};
