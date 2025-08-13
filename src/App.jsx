import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import ShowcaseSectoin from "./sections/ShowcaseSection.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

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
