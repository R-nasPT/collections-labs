import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

type FilterValue = string | number | null | undefined;

type FilterState<T> = {
  [K in keyof T]: T[K] extends FilterValue ? T[K] : never;
};

interface UseUrlFiltersOptions<T extends Record<string, FilterValue>> {
  initialFilters: FilterState<T>;
  constantFilters?: Partial<FilterState<T>>;
  queryParams?: Array<keyof T>;
  updateMethod?: "push" | "replace";
  updateAllowed?: boolean;
}

const useUrlFilters = <T extends Record<string, FilterValue>>({ initialFilters, constantFilters = {}, queryParams = [], updateMethod = "push", updateAllowed = true }: UseUrlFiltersOptions<FilterState<T>>) => {
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

      (queryParams as Array<keyof T>).forEach(addParameter);

      (Object.keys(filters) as Array<keyof T>).forEach((key) => {
        if (!queryParams.includes(key)) {
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
  }, [updateAllowed, shouldUpdateUrl, queryParams, filters, updateMethod, router]);

  const handleFilterChange = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      Object.entries(constantFilters).forEach(([reqKey, reqValue]) => {
        (newFilters as any)[reqKey] = reqValue;
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
