import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

type FilterState<T> = {
  [K in keyof T]: T[K];
};

interface UseUrlFiltersOptions<T> {
  initialFilters: FilterState<T>;
  constantFilters?: Partial<FilterState<T>>;
  sortParams?: Array<keyof T>;
  updateMethod?: "push" | "replace";
  updateAllowed?: boolean;
}

const useUrlFilters = <T extends FilterState<T>>({
  initialFilters,
  constantFilters = {},
  sortParams = [],
  updateMethod = "push",
  updateAllowed = true,
}: UseUrlFiltersOptions<FilterState<T>>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);
  const [filters, setFilters] = useState<FilterState<T>>(() => {
    const urlFilters = Object.fromEntries(searchParams.entries()) as Partial<T>;
    return { ...initialFilters, ...urlFilters } as FilterState<T>;
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

      (sortParams as Array<keyof T>).forEach(addParameter);

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
            (newFilters as any)[constKey] = constValue;
          }
        });
        
        return newFilters;
      });

      setShouldUpdateUrl(true)
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
  sortParams: string[]
}

interface MyFilters {
  page: number;
  per_page: number;
  search?: string;
  field?: string;
  status?: string;
  startDate?: string | undefined;
  endDate?: string | undefined;
  merchant?: string;
}

export default function DeliveryOrdersContent({ initialFilters, sortParams }: DeliveryOrdersContentProps) {

  const isUpdateAllowed = useIsUpdateAllowedPage()
  const { filters, handleFilterChange } = useUrlFilters({
    initialFilters,
    constantFilters: { page: 1 },
    sortParams,
    updateAllowed: isUpdateAllowed,
  } as UseUrlFiltersOptions<MyFilters>);
