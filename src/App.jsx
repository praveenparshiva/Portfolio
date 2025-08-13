import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import ShowcaseSectoin from "./sections/ShowCaseSection";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSectoin />
      <FeatureCards />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
