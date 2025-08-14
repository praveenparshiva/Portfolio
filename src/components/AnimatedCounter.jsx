import React, { useState } from "react";
import { counterItems } from "../constant";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const AnimatedCounter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // run only once
    threshold: 0.2, // 20% of section visible
  });

  return (
    <div id="counter" ref={ref} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-3-cols">
        {counterItems.map((item) => (
          <div
            key={item.label}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col items-center justify-center"
          >
            <div className="counter-number text-white text-5xl font-bold mb-2">
              {inView && (
                <CountUp
                  suffix={item.suffix}
                  end={item.value}
                  duration={2} // animation speed
                  start={0} // start from 0
                />
              )}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
