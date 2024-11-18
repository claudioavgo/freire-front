"use client";

import { useEffect, useRef } from "react";
import { Login } from "@/components/Login";
import { LoginTips } from "@/components/LoginTips";

export default function Home() {
  const loginTipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticketElm = loginTipsRef.current;
    if (!ticketElm) return;

    const { x, y, width, height } = ticketElm.getBoundingClientRect();
    const centerPoint = { x: x + width / 2, y: y + height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const degreeX = (e.clientY - centerPoint.y) * 0.008;
      const degreeY = (e.clientX - centerPoint.x) * -0.008;

      ticketElm.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
    };

    const handleMouseEnter = () => {
      window.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ticketElm.style.transform = ""; // Reset the transform
    };

    ticketElm.addEventListener("mouseenter", handleMouseEnter);
    ticketElm.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ticketElm.removeEventListener("mouseenter", handleMouseEnter);
      ticketElm.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center items-center p-10 select-none">
      <div className="flex w-full h-full">
        <div ref={loginTipsRef} className="w-2/5 ">
          <LoginTips className="h-full animate-fade-right animate-once animate-ease-linear" />
        </div>
        <Login className="flex-1" />
      </div>
    </div>
  );
}
