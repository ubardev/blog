import { notFound } from "next/navigation"
import { EditPostClient } from "./edit-client"
import { getPostById } from "../../actions"

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const result = await getPostById(id)

  if (!result.success || !result.data) {
    notFound()
  }

  return <EditPostClient post={result.data} />
}
