import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ModuleCard } from ".";

const meta: Meta<typeof ModuleCard> = {
  component: ModuleCard,
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: Outlet,
      });

      const indexRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: () => <Story />,
      });

      const studyRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/study/$moduleId",
        component: () => <div>Study page</div>,
      });

      const router = createRouter({
        routeTree: rootRoute.addChildren([indexRoute, studyRoute]),
        history: createMemoryHistory({
          initialEntries: ["/"],
        }),
      });

      return <RouterProvider router={router} />;
    },
  ],
};
export default meta;

type Story = StoryObj<typeof ModuleCard>;

export const Default: Story = {
  args: {
    module: {
      id: "course-introduction",
      module: "Course Introduction",
      course: "Level 3 PT Diploma",
      type: "orientation",
      chunks: Array(6).fill({}),
    },
  },
};
