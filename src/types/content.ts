export type Difficulty = "foundation" | "intermediate" | "advanced";

export type UnitType = "orientation" | "unit_introduction" | "teaching_content";

export interface SubTopic {
  name: string;
  content: string;
}

export interface Chunk {
  id: number;
  title: string;
  difficulty: Difficulty;
  concept: string;
  key_terms: string[];
  actions: string[];
  materials: string[];
  exam_tip?: string;
  tutor_quote?: string;
  sub_topics?: SubTopic[];
  note?: string;
  section?: string;
}

export interface Unit {
  id: string;
  name: string;
  moduleId: string;
  type: UnitType;
  order: number;
  chunks: Chunk[];
}

export interface Module {
  id: string;
  name: string;
  order: number;
  unitIds: string[];
}
