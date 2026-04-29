import { Timestamp } from "firebase/firestore";

export type CardState = "new" | "learning" | "review" | "mastered";

export interface FlashcardState {
  termId: string;
  chunkId: number;
  moduleId: string;
  state: CardState;
  interval: number;
  easeFactor: number;
  nextReviewAt: Date;
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  chunkId: number;
  completedAt: Timestamp;
  flashcardResults: FlashcardResult[];
}

export interface FlashcardResult {
  termId: string;
  correct: boolean;
  answeredAt: Timestamp;
}
