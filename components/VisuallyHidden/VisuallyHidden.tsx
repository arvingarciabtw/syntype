import React from "react";
import VisuallyHiddenWrapper from "@/components/VisuallyHidden/VisuallyHidden.style";
import type { VisuallyHiddenProps } from "@/components/VisuallyHidden/VisuallyHidden.types";

const VisuallyHidden = ({
  children,
  ...delegated
}: VisuallyHiddenProps) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <VisuallyHiddenWrapper {...delegated}>{children}</VisuallyHiddenWrapper>
  );
};
export default VisuallyHidden;
