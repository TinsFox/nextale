import { useQuery } from "@tanstack/react-query"

const fetchUser = async () => {
  const res = await fetch("/api/users/profile")
  const user = await res.json()
  return user
}

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  })
  return user
}
