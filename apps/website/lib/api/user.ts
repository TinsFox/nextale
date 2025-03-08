import { fetcher } from "./fetcher"
import { User } from "@/types/user"

export const fetchUser = async () => {
  return await fetcher<User>("/api/users/profile")
}
