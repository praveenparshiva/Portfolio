import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowCaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  // Fade-in section
  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
  }, []);

  // Animate individual projects
  useGSAP(() => {
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];

    projects.forEach((card, index) => {
      if (!card) return; // prevent null errors
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* Left Side */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper">
              <a href="https://www.surakshaservice.in/">
                <img src="/images/project1.png" alt="SurakshaService" />
              </a>
            </div>
            <div className="text-content">
              <h2>
                Suraksha Service – Expert Tank and Sump Cleaning for Homes and
                Businesses
              </h2>
              <p className="text-white-50 md:text-xl">
                A modern web application built with React.js, delivering a fast,
                intuitive, and user-friendly experience.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <a href="https://praveenparshiva.github.io/3D_Model/">
                  <img src="/images/project2.png" alt="3d-Model" />
                </a>
              </div>
              <h2>Built with HTML, CSS, JavaScript, and Spline</h2>
            </div>
            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <a href="https://praveenparshiva.github.io/travel_log/">
                  <img src="/images/project3.png" alt="TravelLog" />
                </a>
              </div>
              <h2>
                Static travel-themed landing page highlighting seven
                world-renowned landmarks
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseSection;
