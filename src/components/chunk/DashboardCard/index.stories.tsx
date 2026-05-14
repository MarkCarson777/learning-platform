import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashboardCard } from ".";

const meta = {
  title: "UI/DashboardCard",
  component: DashboardCard,
} satisfies Meta<typeof DashboardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    label: "Modules",
  },
};
