"use client";

import useSlidesPerView from "@/hooks/use-slidesPerView";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselContainer = ({ children }: { children: ReactNode[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesPerView = useSlidesPerView(containerRef);

  const [index, setIndex] = useState(0);

  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - (slidesPerView ?? 1));

  // لما الـ slidesPerView يتغير (responsive)
  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [slidesPerView, maxIndex]);

  const nextSlide = () =>
    setIndex((prev) => Math.min(prev + 1, maxIndex));

  const prevSlide = () =>
    setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div ref={containerRef} className="w-full space-y-4 overflow-hidden">
      {/* Track */}
      <div
        className="flex transition-transform ease-out duration-300 gap-6"
        style={{
          transform: `translateX(-${(index * 100) / (slidesPerView ?? 1)}%)`,
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="shrink-0 px-2"
            style={{ width: `calc(${100 / (slidesPerView ?? 1)}% - 20px)` }}
          >
            {child}
          </div>
        ))}
      </div>

      {totalSlides > (slidesPerView ?? 1) && (
        <div className="flex items-center gap-4 justify-center sm:justify-end">
          <Button
          className="cursor-pointer"
            onClick={prevSlide}
            disabled={index === 0}
          >
            <ChevronLeft className="w-5 h-5 font-semibold" />
          </Button>

          <Button
            className="cursor-pointer"
            onClick={nextSlide}
            disabled={index === maxIndex}
          >
            <ChevronRight className="w-5 h-5 font-semibold" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarouselContainer;
