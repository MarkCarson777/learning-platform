import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/study/$moduleId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/study/$moduleId"!</div>
}
