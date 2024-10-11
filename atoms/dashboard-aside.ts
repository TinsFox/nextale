import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const sidebarExpandedAtom = atomWithStorage("sidebarExpanded", true)
export const useSidebarExpanded = () => useAtom(sidebarExpandedAtom)
