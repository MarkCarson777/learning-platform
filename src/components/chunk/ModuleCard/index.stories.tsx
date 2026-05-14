import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
      const queryClient = new QueryClient();
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
        path: "/study/$unitId",
        component: () => <div>Study page</div>,
      });

      const router = createRouter({
        routeTree: rootRoute.addChildren([indexRoute, studyRoute]),
        history: createMemoryHistory({
          initialEntries: ["/"],
        }),
      });

      return (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof ModuleCard>;

export const Default: Story = {
  args: {
    module: {
      id: "1",
      name: "Module 1",
      order: 1,
      unitIds: ["1", "2", "3"],
    },
  },
};
