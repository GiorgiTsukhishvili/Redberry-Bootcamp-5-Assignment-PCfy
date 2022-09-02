import { useState } from "react";

const useSetDropdownValidHook = () => {
  const [dropdownValid, setDropdownValid] = useState<{
    first: boolean;
    second: boolean;
  }>({
    first: true,
    second: true,
  });

  const changeDropdown = (number: string, truthiness: boolean) => {
    setDropdownValid((prevState: { first: boolean; second: boolean }) => {
      return { ...prevState, [number]: truthiness };
    });
  };

  return { dropdownValid, changeDropdown };
};

export default useSetDropdownValidHook;
