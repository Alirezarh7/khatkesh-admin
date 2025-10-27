"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useThemeStore} from "../../../store/themeStore.ts";

type Props = { open: boolean; message?: string };

export default function RulerLoadingOverlay({ open, message = "در حال بارگذاری..." }: Props) {
  const { theme } = useThemeStore();

  // قفل اسکرول + inert کردن محتوای زیر
  useEffect(() => {
    const html = document.documentElement;
    const appRoot = document.getElementById("app-root");

    if (open) {
      html.style.overflow = "hidden";                // قفل اسکرول
      html.style.overscrollBehavior = "contain";     // جلوگیری از pull-to-refresh
      appRoot?.setAttribute("inert", "");            // جلوگیری از هرگونه تعامل
      appRoot?.setAttribute("aria-hidden", "true");
      appRoot?.classList.add("pointer-events-none"); // fallback برای مرورگرهای بدون inert
    } else {
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      appRoot?.removeAttribute("inert");
      appRoot?.removeAttribute("aria-hidden");
      appRoot?.classList.remove("pointer-events-none");
    }

    return () => {
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      appRoot?.removeAttribute("inert");
      appRoot?.removeAttribute("aria-hidden");
      appRoot?.classList.remove("pointer-events-none");
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: تمام صفحه، کلیک/اسکرول/تاچ رو می‌بلعد */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] cursor-wait"
            style={{ backgroundColor: "var(--fixedDark)" }}
            onClick={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden
          />

          {/* کانتینر وسط‌چین */}
          <div className="fixed inset-0 z-[70] grid place-items-center p-4 pointer-events-none">
            <motion.div
              role="status"
              aria-busy="true"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto w-fit "
              style={{
                color: "var(--text)",
              }}
              onClick={(e) => e.stopPropagation()} // کلیک داخل باکس به بک‌دراپ نخورد
            >
              <div className="flex flex-col items-center justify-center gap-4">
                {/* --- SVG لودر خط‌کش --- */}
                <svg
                  width="300"
                  height="60"
                  viewBox="0 0 300 60"
                  className="w-[260px] h-auto md:w-[500px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0" y="15" width="300" height="30" fill="var(--border)" opacity="0.6" />
                  <motion.rect
                    x="0"
                    y="15"
                    width="0"
                    height="30"
                    fill="var(--accent)"
                    animate={{ width: "300px" }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line
                      key={i}
                      x1={i * 20}
                      y1="15"
                      x2={i * 20}
                      y2={i % 2 === 0 ? 25 : 35}
                      stroke={theme === "dark" ? "#0A1931" : "#0A193150"}
                      strokeOpacity="0.9"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>

                <p className="font-bold text-liteText md:text-lg">{message}</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
