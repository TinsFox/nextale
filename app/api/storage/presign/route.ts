import { NextResponse } from "next/server"
import { env } from "@/env"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function POST(request: Request) {
  if (!env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
    return NextResponse.json(
      { error: "S3_ACCESS_KEY_ID or S3_SECRET_ACCESS_KEY is not set" },
      { status: 400 }
    )
  }
  try {
    const { fileName, contentType } = await request.json()

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: "fileName and contentType are required" },
        { status: 400 }
      )
    }

    const client = new S3Client({
      region: "auto",
      endpoint: env.S3_ENDPOINT,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
    })

    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: fileName,
      ContentType: contentType,
      ACL: "public-read",
    })

    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: 3600,
    })

    // Ensure URLs are properly formatted
    let publicUrl: string
    if (env.S3_PUBLIC_DOMAIN) {
      const domain = env.S3_PUBLIC_DOMAIN.replace(/\/+$/, "")
      publicUrl = `${domain}/${fileName}`
    } else {
      const endpoint = env.S3_ENDPOINT
      publicUrl = `${endpoint}/${env.S3_BUCKET}/${fileName}`
    }

    return NextResponse.json({
      url: presignedUrl,
      publicUrl: publicUrl,
    })
  } catch (error) {
    console.error("Error generating presigned URL:", error)
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    )
  }
}
