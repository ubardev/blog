import { PostForm } from "@/components/admin/post-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import { EditPostClient } from "./edit-client"

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const allPosts = getAllPosts()
  const post = allPosts.find((p) => p.id === parseInt(id) || p.slug === id)

  if (!post) {
    notFound()
  }

  return <EditPostClient post={post} />
}
