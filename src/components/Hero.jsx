import React, { useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';



const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText('E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>PEPE IQ<br />x402</h1>
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
          <p className="hero-desc">AI chat agent meets meme culture featuring x402 integration on Solana</p>
          <div className="hero-subtitle">
            Chat with PEPIQ AI, your intelligent companion built on ElizaOS Cloud. Ask questions, get instant responses, and experience the future of AI-powered memes.
          </div>
          <div className="hero-actions">
            <a href="https://pump.fun/coin/E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump" className="btn btn-primary">BUY $PEPIQ</a>
            <span style={{cursor: "not-allowed"}} className="btn btn-secondary"> PEPIQ SIGNAL<FontAwesomeIcon icon={faRobot} /></span>
          </div>
        </div>
        <div className="hero-swap">
          <div className="swap-box">
            <div className="swap-header">
              <h3>Swap</h3>
              <div className="swap-settings">
                <button className="settings-btn" data-tooltip="Settings - Coming E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="swap-form">
              <div className="swap-input-group">
                <div className="swap-input from">
                  <div className="token-select">
                    <img src="/assets/solana-logo.png" alt="SOL" />
                    <span>SOL</span>
                    <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                  <input type="text" placeholder="0.0" readOnly />
                </div>
                <div className="swap-arrow-container">
                  <button className="swap-arrow">↓</button>
                </div>
                <div className="swap-input to">
                  <div className="token-select">
                    <img src="/assets/logo.png" alt="$PEPIQ" />
                    <span>PEP</span>
                    <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                  <input type="text" placeholder="0.0" readOnly />
                </div>
              </div>
              <div className="swap-details">
                <div className="detail-item">
                  <span>Price</span>
                  <span>1 SOL ≈ - $PEPIQ</span>
                </div>
                <div className="detail-item">
                  <span>Slippage Tolerance</span>
                  <span>0.5%</span>
                </div>
                <div className="detail-item">
                  <span>Minimum Received</span>
                  <span>-- $PEPIQ</span>
                </div>
                <div className="detail-item">
                  <span>Price Impact</span>
                  <span className="low-impact">&lt; 0.01%</span>
                </div>
                <div className="detail-item">
                  <span>Liquidity Provider Fee</span>
                  <span>0.003 SOL</span>
                </div>
              </div>
              <button className="btn btn-primary swap-btn" data-tooltip="Swap Under Development - Coming E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump">Swap</button>
            </div>
            <div className="swap-footer">
              <span className="dev-note">Powered by $PEPIQ • Under Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;