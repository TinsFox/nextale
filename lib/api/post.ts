export const fetchPosts = async () => {
  const res = await fetch("http://localhost:8080/posts")
  const posts = await res.json()
  return posts
}

export async function fetchPostDetail(slug: string) {
  const post = await fetch(`http://localhost:8080/posts/${slug}`)
  return post.json()
}