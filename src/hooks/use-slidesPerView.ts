import { useEffect, useState } from "react";

const useSlidesPerView = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;

        console.log(width)
      if (width >= 1024) setSlidesPerView(4);
      else if (width >= 950) setSlidesPerView(3);
      else if (width >= 565) setSlidesPerView(2);
      else setSlidesPerView(1);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return slidesPerView;
};

export default useSlidesPerView;
