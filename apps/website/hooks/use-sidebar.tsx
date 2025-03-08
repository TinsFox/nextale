import { useMemo } from "react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export type SidebarState = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}
const tableSidebarAtom = atomWithStorage("table-sidebar", true)
export const useSidebar = (): SidebarState => {
  const [isOpen, setIsOpen] = useAtom(tableSidebarAtom)
  return useMemo(() => {
    return {
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }
  }, [isOpen, setIsOpen])
}
