import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

interface UseUrlFiltersOptions<T extends Record<string, unknown>> {
  initialFilters: T;
  constantFilters?: Partial<T>;
  sortParams?: readonly (keyof T)[];
  updateMethod?: "push" | "replace";
  updateAllowed?: boolean;
}

const useUrlFilters = <T extends Record<string, unknown>>({
  initialFilters,
  constantFilters = {},
  sortParams = [],
  updateMethod = "push",
  updateAllowed = true,
}: UseUrlFiltersOptions<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);
  const [filters, setFilters] = useState<T>(() => {
    const urlFilters = Object.fromEntries(searchParams.entries()) as Partial<T>;
    return { ...initialFilters, ...urlFilters } as T;
  });

  const updateURL = useCallback(() => {
    if (updateAllowed && shouldUpdateUrl) {
      const params = new URLSearchParams();

      const addParameter = (key: keyof T) => {
        const value = filters[key];
        if (value !== null && value !== "" && value !== undefined) {
          params.append(key.toString(), value.toString());
        }
      };

      sortParams.forEach(addParameter);

      (Object.keys(filters) as Array<keyof T>).forEach((key) => {
        if (!sortParams.includes(key)) {
          addParameter(key);
        }
      });

      if (updateMethod === "replace") {
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        router.push(`?${params.toString()}`, { scroll: false });
      }
      setShouldUpdateUrl(false);
    }
  }, [updateAllowed, shouldUpdateUrl, sortParams, filters, updateMethod, router]);

  const handleFilterChange = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      Object.entries(constantFilters).forEach(([constKey, constValue]) => {
        if (constKey !== key) {
          (newFilters as Record<string, unknown>)[constKey] = constValue;
        }
      });
      
      return newFilters;
    });

    setShouldUpdateUrl(true);
  }, [constantFilters]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  return {
    filters,
    handleFilterChange,
    setFilters,
  };
};

export default useUrlFilters;


// ---------------- วิธีใช้งาน ---------------------

interface DeliveryOrdersContentProps {
  initialFilters: {
    page: number;
    per_page: number;
    search?: string;
    field?: string;
    status?: string;
    startDate?: string | null;
    endDate?: string | null;
    merchant?: string;
  };
  sortParams: ReadonlyArray<keyof DeliveryOrdersContainerProps["initialFilters"]
}

export default function DeliveryOrdersContent({ initialFilters, sortParams }: DeliveryOrdersContentProps) {

  const isUpdateAllowed = useIsUpdateAllowedPage()
  const { filters, handleFilterChange } = useUrlFilters({
    initialFilters,
    constantFilters: { page: 1 },
    sortParams,
    updateAllowed: isUpdateAllowed,
  });
