import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chunk } from ".";

const meta = {
  title: "UI/Chunk",
  component: Chunk,
} satisfies Meta<typeof Chunk>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chunk: {
      id: 1,
      title: "Title",
      difficulty: "foundation",
      concept: "A short explanation of the concept covered in this chunk.",
      key_terms: ["term one", "term two"],
      actions: ["Try this", "Then this"],
      materials: ["Gym equipment"],
      exam_tip: "Remember this for the exam.",
      tutor_quote: "Safe and effective.",
      sub_topics: [{ name: "Sub-topic", content: "Sub-topic content." }],
      note: "An optional note.",
      section: "Section A",
    },
  },
};
