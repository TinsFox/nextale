import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json()
    const postId = parseInt(params.id)

    const post = await db.post.update({
      where: { id: postId },
      data: { status },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
