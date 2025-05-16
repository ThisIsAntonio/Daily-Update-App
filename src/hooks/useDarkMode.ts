"use client";

import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Cargar modo inicial desde localStorage (solo cliente)
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const darkPref = stored === "dark";
    setIsDark(darkPref);

    setHasMounted(true);
  }, []);

  // Aplicar clase al HTML y guardar en localStorage
  useEffect(() => {
    if (!hasMounted) return;

    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, hasMounted]);

  return [isDark, setIsDark, hasMounted] as const;
}
