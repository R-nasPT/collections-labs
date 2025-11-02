import { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

interface UseUrlFiltersOptions<T extends Record<string, unknown>> {
  initialFilters: T;
  constantFilters?: Partial<T>;
  sortParams?: readonly (keyof T)[];
  updateMethod?: 'push' | 'replace';
  updateAllowed?: boolean;
}

const useUrlFilters = <T extends Record<string, unknown>>({
  initialFilters,
  constantFilters = {},
  sortParams = [],
  updateMethod = 'push',
  updateAllowed = true,
}: UseUrlFiltersOptions<T>) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);
  const [filters, setFilters] = useState<T>(() => {
    const urlFilters = Object.fromEntries(searchParams.entries()) as Partial<T>;
    return { ...initialFilters, ...urlFilters } as T;
  });

  // navigation is handled in a dedicated effect below that reads filters
  // from a stable ref to avoid dependency/identity loops.

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
    },
    [constantFilters]
  );

  // Keep a ref to filters so we can read the latest value inside the
  // navigation effect without including the filters object in the effect's
  // dependency array. This prevents re-running navigation when only the
  // filters object's identity changes.
  const filtersRef = useRef<T>(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Effect dedicated to performing URL updates when explicitly requested
  // (shouldUpdateUrl). It reads filters from the stable ref to avoid
  // depending on the filters object identity and causing extra runs.
  useEffect(() => {
    if (!updateAllowed || !shouldUpdateUrl) return;

    const params = new URLSearchParams();

    const addParameter = (key: keyof T) => {
      const value = filtersRef.current[key];
      if (value !== null && value !== '' && value !== undefined) {
        params.append(key.toString(), value.toString());
      }
    };

    sortParams.forEach(addParameter);

    (Object.keys(filtersRef.current) as Array<keyof T>).forEach((key) => {
      if (!sortParams.includes(key)) {
        addParameter(key);
      }
    });

    if (updateMethod === 'replace') {
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      navigate(`?${params.toString()}`);
    }

    // reset the flag after navigation
    setShouldUpdateUrl(false);
  }, [updateAllowed, shouldUpdateUrl, sortParams, updateMethod, navigate]);

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
