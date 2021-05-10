import { useState, useEffect } from "react";

function useDeferredMount() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setShouldMount(true);
      });
    });
  });

  return shouldMount;
}

export default useDeferredMount;
