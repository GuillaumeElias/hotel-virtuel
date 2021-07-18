import { useEffect } from "react";

const ScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return "";
};

export default ScrollTop;
