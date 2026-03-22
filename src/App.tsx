import { StarBackground } from "./components/starbackground";
import Navbar from "./components/Navbar";
import Projects from "./pages/projects";
import Automations from "./pages/automations";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Chatbot from "./components/Chatbot";
import SpaceShooter from "./components/SpaceShooter";
import MemoryGame from "./components/MemoryGame";
import { Link, Element } from "react-scroll";
import { ChevronDown } from "lucide-react";

function App() {
  return (
    <div className="w-full">
      <StarBackground />
      <Navbar />

      <Element name="home">
        <ProfilePage />
      </Element>

      <Element name="skills">
        <Skills />
      </Element>

      <Element name="experience">
        <Experience />
      </Element>

      <Element name="projects">
        <Projects />
      </Element>

      <Element name="automations">
        <Automations />
      </Element>

      <Element name="game">
        <SpaceShooter />
      </Element>

      <Element name="memory">
        <MemoryGame />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>

      <Chatbot />
    </div>
  );
}
export default App;

function ProfilePage() {
  return (
    <div className="relative w-full min-h-screen flex items-center">
      <div className="flex flex-row justify-between items-center w-full px-8 md:px-24 lg:px-[170px] py-20 lg:py-[152px]">
        <div className="text-white flex flex-col items-start gap-8 max-w-[418px]">
          <div className="flex flex-col items-start">
            <h1 className="text-[56px] md:text-[96px] font-bold leading-none">Hi,</h1>
            <h2 className="text-[42px] md:text-[70px] font-bold">I'm Aldren</h2>
          </div>
          <p className="text-left text-[18px] md:text-[25px] leading-8 md:leading-9">
            I'm a Software developer <br />
            with experience in Mobile, <br />
            Web, and AI development.
          </p>
          <div className="flex gap-4">
            <Link to="projects" smooth={true} duration={500} offset={-70}>
              <button
                type="button"
                className="bg-[#75C310] hover:bg-[#65b310] transition-colors rounded-[30px] px-6 h-[48px] md:h-[56px] text-[16px] md:text-[18px] font-bold"
              >
                View My Work
              </button>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-70}>
              <button
                type="button"
                className="border-2 border-[#75C310] text-[#75C310] hover:bg-[#75C310]/10 transition-colors rounded-[30px] px-6 h-[48px] md:h-[56px] text-[16px] md:text-[18px] font-bold"
              >
                Contact Me
              </button>
            </Link>
          </div>
        </div>

        <div className="h-[415px] w-[418px] p-5 hidden md:block">
          <img
            src="/profile/circle_profile.png"
            alt="Profile"
            className="h-full w-full object-cover rounded-full border-[10px] border-[#75C310]"
          />
        </div>
      </div>

      {/* Scroll down hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </div>
  );
}
