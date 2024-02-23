import { useState } from "react";

type UseToggleReturnType = [boolean, () => void];

function useToggle(initialState: boolean = false): UseToggleReturnType {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = (): void => setState(!state);

  return [state, toggle];
}

export default useToggle;
