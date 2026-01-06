import React from 'react';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Project</h4>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#tokenomics" onClick={(e) => { e.preventDefault(); scrollToSection('tokenomics'); }}>Tokenomics</a>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            {/* <a href="https://t.me/PEPIQ_SOL" target="_blank" rel="noopener noreferrer">Telegram</a> */}
            <a href="https://x.com/pepiqx402/status/2008150143049338968?s=46" target="_blank" rel="noopener noreferrer">Twitter/X</a>
          </div>
          <div className="footer-col">
            <h4>Contract</h4>
            <a href="#buy" onClick={(e) => { e.preventDefault(); scrollToSection('buy'); }}>CA: SOON</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 PEPIQ</div>
          <div className="footer-disclaimer">Not financial advice. DYOR.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;