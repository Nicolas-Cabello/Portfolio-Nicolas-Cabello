import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import CurriculumSection from './components/CurriculumSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CurriculumSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
};

export default HomePage;
