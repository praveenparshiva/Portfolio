import React, { useRef } from "react";
import { counterItems } from "../constant";
import CountUp from "react-countup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const countersRef = useRef([]);

  React.useEffect(() => {
    countersRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-3-cols">
        {counterItems.map((item, index) => (
          <div
            key={item.label}
            ref={(el) => (countersRef.current[index] = el)}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col items-center justify-center"
          >
            <div className="counter-number text-white text-5xl font-bold mb-2">
              <CountUp
                suffix={item.suffix}
                end={item.value}
                enableScrollSpy={true} // triggers when visible
                scrollSpyOnce={true} // runs only once
              />
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
