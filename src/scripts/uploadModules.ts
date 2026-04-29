import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, terminate } from "firebase/firestore";
import process from "node:process";
import courseIntro from "../data/courseIntro.json";
import principlesIntro from "../data/principlesIntro.json";
import principlesWebinar from "../data/principlesWebinar.json";

process.loadEnvFile?.();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  throw new Error(
    `Missing Firebase env vars in .env: ${missingKeys.join(", ")}`,
  );
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const modules = [
  { id: "course-introduction", ...courseIntro },
  { id: "principles-introduction", ...principlesIntro },
  { id: "principles-webinar", ...principlesWebinar },
];

async function uploadModules() {
  for (const module of modules) {
    try {
      await setDoc(doc(db, "modules", module.id), module);
      console.log(`Uploaded module ${module.id}`);
    } catch (error) {
      console.error(`Failed module ${module.id}`, error);
      throw error;
    }
  }
  console.log("Upload complete");
}

uploadModules()
  .then(async () => {
    await terminate(db);
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Upload failed", error);
    await terminate(db);
    process.exit(1);
  });
