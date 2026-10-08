import { ChoisysSection } from './components/ChoisysSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { NeoCube } from './components/NeoCube';
import { Studio } from './components/Studio';
import { PublicPage } from './components/PublicPage';
import { findPublicPage } from './publicPages.mjs';
import { useEffect } from 'react';

export function App() {
  const isHome = window.location.pathname === '/';
  const page = findPublicPage(window.location.pathname);
  useEffect(() => {
    document.title = isHome ? 'Scenarys' : `${page?.title ?? 'Página no encontrada'} — Scenarys`;
  }, [isHome, page]);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        {isHome ? <>
        <Hero />
        <ChoisysSection />
        <HowItWorks />
        <NeoCube />
        <Studio />
        <Contact />
        </> : <PublicPage page={page} />}
      </main>
      <Footer />
    </div>
  );
}
