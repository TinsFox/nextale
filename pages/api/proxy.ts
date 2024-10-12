import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid URL parameter" })
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(url).host,
      } as unknown as Record<string, string>,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    })

    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    console.error("Proxy error:", error)
    res
      .status(500)
      .json({ error: "An error occurred while proxying the request" })
  }
}
