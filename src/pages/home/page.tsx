import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import CurriculumSection from './components/CurriculumSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import ScrollProgress from '../../components/ScrollProgress';
import SiteChat from '../../components/SiteChat';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#030014] text-[#e2e8f0]">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CurriculumSection />
      <ContactSection />
      <FooterSection />
      <SiteChat />
    </main>
  );
};

export default HomePage;
