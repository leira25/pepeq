import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Safe, reliable wallet imports
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

import { clusterApiUrl } from '@solana/web3.js';

import Nav from './components/Nav';
import Hero from './components/Hero';
import IntroStatement from './components/IntroStatement';
import FeatureCards from './components/FeatureCards';
import ImageTextSection from './components/ImageTextSection';
import ComparisonSection from './components/ComparisonSection';
import CoreMessage from './components/CoreMessage';
import Tokenomics from './components/Tokenomics';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Particles from './components/Particles';
import InteractiveBG from './components/InteractiveBG';
import './index.css';

// Required CSS for wallet buttons/modal
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const navRef = useRef(null);

  // Mainnet connection
  const network = clusterApiUrl('mainnet-beta');

  // Only stable, widely-supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // BackpackWalletAdapter removed to avoid import errors
      // You can add more wallets later if needed (e.g. Torus, Ledger)
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
          navRef.current.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="App">
            <Particles />
            <InteractiveBG />
            {bannerVisible && (
              <div className="top-banner">
                INTRODUCING PEPIQ: AI CHAT AGENT × 402X INTEGRATION - MEME WITH REAL UTILITY
                <button className="close-banner" onClick={() => setBannerVisible(false)}>×</button>
              </div>
            )}
            <Nav ref={navRef} scrollToSection={scrollToSection} />
            <Hero />
            <IntroStatement />
            <FeatureCards />
            <ImageTextSection
              id="about"
              imgSrc="/assets/banner1.png"
              textLabel="AI Technology"
              title="Chat with PEPIQ AI"
              paragraphs={[
                "We built our own AI agent using ElizaOS Cloud. Not automation scripts a real conversational AI that understands context, answers questions, and engages naturally.",
                "Available 24/7 for the community. Enhanced with 402X integration for seamless connectivity."
              ]}
            />
            <ImageTextSection
              reverse
              imgSrc="/assets/banner2.png"
              textLabel="Community Driven"
              title="Built for the People"
              paragraphs={[
                "Fair launch with zero team tokens. Liquidity burned forever, contract renounced on day one. This isn't our token it's yours.",
                "Every decision is community-driven. PEPIQ belongs to the holders, not a centralized team."
              ]}
            />
            <ComparisonSection />
            <CoreMessage />
            <Tokenomics />
            <CTASection />
            <Footer scrollToSection={scrollToSection} />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;