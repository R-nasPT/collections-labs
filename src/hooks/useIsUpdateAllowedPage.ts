import { usePathname } from "@/navigation";
import { NON_UPDATE_PAGES } from "@/routes";

export default function useIsUpdateAllowedPage() {
  const pathname = usePathname();
  return !NON_UPDATE_PAGES.some((page) => pathname.includes(page));
}
