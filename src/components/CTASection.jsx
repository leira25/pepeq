import React, { useState } from 'react';

const CTASection = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText('E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="buy" className="cta-section">
      <div className="container-narrow">
        <h2>Experience AI-Powered Memes Today</h2>
        <p>Join the community and chat with PEPIQ AI built on ElizaOS.</p>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-text">Get Solana wallet</div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-text">Buy SOL</div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-text">Swap for $PEPIQ</div>
          </div>
        </div>
        <div className="ca-box">
          <label>Contract Address</label>
          <div className="ca-input-wrapper">
            <input type="text" id="ca" value="E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump" readOnly />
            <button onClick={copyCA}>
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;