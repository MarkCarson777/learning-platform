// src/scripts/uploadModule.ts
// Usage: npx tsx src/scripts/uploadModule.ts src/data/course-introduction.json

import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, doc, terminate } from "firebase/firestore";
import { readFileSync } from "node:fs";
import type { Unit } from "../types/content";

process.loadEnvFile?.();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadModule(filePath: string) {
  const raw = JSON.parse(readFileSync(filePath, "utf-8"));
  const { module, units } = raw;
  const batch = writeBatch(db);

  // Write the module document
  batch.set(doc(db, "modules", module.id), {
    ...module,
    unitIds: units.map((u: Unit) => u.id),
  });

  // Write each unit document with moduleId
  for (const unit of units) {
    batch.set(doc(db, "units", unit.id), {
      ...unit,
      moduleId: module.id,
    });
  }

  await batch.commit();
  console.log(`Uploaded module "${module.name}" with ${units.length} units`);
}

const filePath = process.argv[2];
if (!filePath) throw new Error("Usage: npx tsx uploadModule.ts <path-to-json>");

uploadModule(filePath)
  .then(async () => {
    await terminate(db);
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    await terminate(db);
    process.exit(1);
  });
