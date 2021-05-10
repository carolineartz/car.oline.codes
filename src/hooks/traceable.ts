import React from "react";

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function useHasChanged<T>(value: T) {
  const prevVal = usePrevious(value);
  return prevVal !== value;
}

export function useTraceableState<T>(
  initialValue: T
): [T, T | undefined, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState(initialValue);
  const prevValue = usePrevious(value);
  return [value, prevValue, setValue];
}
