async function fetchPosts() {
  const posts = await fetch("http://localhost:8080/posts")
  const postsData = await posts.json()
  return postsData
}

export default async function Posts() {
  const posts = await fetchPosts()
  console.log("posts: ", posts.data)
  return <div>Posts</div>
}
