import React, { forwardRef } from 'react';

const Nav = forwardRef(({ scrollToSection }, ref) => {
  return (
    <nav className="nav" ref={ref}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/assets/logo.png" alt="PEPIQ" />
          <span style={{ fontSize: '36px', color: '#00FF00' }}>$PEPIQ</span>
        </div>
        <div className="nav-links">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>ABOUT</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>FEATURES</a>
          <a href="#tokenomics" onClick={(e) => { e.preventDefault(); scrollToSection('tokenomics'); }}>TOKENOMICS</a>
          {/* <a href="https://t.me/PEPIQ_SOL" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
          </a> */}
          <a href="https://x.com/pepiqx402/status/2008150143049338968?s=46" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        <a href="https://www.elizacloud.ai/dashboard/chat?characterId=2edfdf0f-8069-4e7e-a6d6-d7b39487b9bc" className="nav-cta" target="_blank" rel="noopener noreferrer">LAUNCH APP</a>
      </div>
    </nav>
  );
});

Nav.displayName = 'Nav';

export default Nav;