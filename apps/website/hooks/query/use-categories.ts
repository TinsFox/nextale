import { getCategories } from "@/lib/api/categories"
import { useQuery } from "@tanstack/react-query"

export function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })
  return { data: data?.data ?? [], isLoading }
}
