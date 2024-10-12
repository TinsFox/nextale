import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "@/lib/api/user"

// const fetchUser = async () => {
//   const res = await fetch("/api/users/profile")
//   const user = await res.json()
//   return user
// }

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  })
  return { user, isLoading }
}
