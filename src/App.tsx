import { ChoisysSection } from './components/ChoisysSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { NeoCube } from './components/NeoCube';
import { Studio } from './components/Studio';

export function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <ChoisysSection />
        <HowItWorks />
        <NeoCube />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
