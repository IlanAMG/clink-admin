import { useEffect } from "react";

/**
 * Hook that action clicks outside of the passed ref
 */
export function useOutsideAction(refs, onHide) {
  useEffect(() => {
    function handleClickOutside(event) {
      const close = refs.filter(Boolean).every(ref => ref.current && !ref.current.contains(event.target))
      if (close) {
        onHide()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refs]);
}