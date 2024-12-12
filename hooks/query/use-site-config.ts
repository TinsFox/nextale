import { useQuery } from "@tanstack/react-query"

import { getSiteConfig } from "@/lib/api/config"

export function useSiteConfig() {
  const { data, isLoading } = useQuery({
    queryKey: ["site-config"],
    queryFn: async () => getSiteConfig(),
  })

  return {
    isLoading,
    navItems: data?.navItems ?? [],
    theme: data?.theme,
  }
}
