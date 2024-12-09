import React, { useState, useEffect } from "react";

export default function useDeviceCategory() {
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDekstop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const updateDeviceCategory = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth > 1024);
    };

    updateDeviceCategory();
    window.addEventListener("resize", updateDeviceCategory);

    return () => {
      window.removeEventListener("resize", updateDeviceCategory);
    };
  }, []);

  return [isTablet, isDekstop];
}
