// Hero.jsx - Pump.fun Integration
import React, { useState } from 'react';
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
              <input type="text" value="E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump" readOnly />
              <button onClick={copyCA}>{copied ? '✓' : 'Copy'}</button>
            </div>
          </div>

          <p className="hero-desc">
            AI chat agent meets meme culture featuring x402 integration on Solana
          </p>

          <div className="hero-subtitle">
            Chat with PEPIQ AI, your intelligent companion built on ElizaOS Cloud...
          </div>

          <div className="hero-actions">
            <a 
              href="https://pump.fun/E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              BUY $PEPIQ on Pump.fun
            </a>
            <a style={{ cursor: 'not-allowed' }} className="btn btn-secondary">
              PEPIQ SIGNAL (SOON)<FontAwesomeIcon icon={faRobot} />
            </a>
          </div>
        </div>

        <div className="hero-swap">
          <div className="swap-box">
            <div className="swap-header">
              <h3>Trade $PEPIQ</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Currently on Pump.fun</span>
            </div>

            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ 
                background: 'rgba(59, 130, 246, 0.1)', 
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>🚀 Bonding Curve Progress</h4>
                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  height: '24px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                    height: '100%',
                    width: '58%',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>58%</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  22.371 SOL raised • $57,468 to graduate to Raydium
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.8 }}>
                  $PEPIQ is currently trading on Pump.fun's bonding curve.
                  Once it reaches 100%, it will automatically create a Raydium liquidity pool!
                </p>
              </div>

              <a 
                href="https://pump.fun/E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Trade on Pump.fun →
              </a>

              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                opacity: 0.7
              }}>
                <p>💡 After graduation, you'll be able to swap directly on this website using Jupiter/Raydium!</p>
              </div>
            </div>

            <div className="swap-footer">
              <span className="dev-note">Live on Pump.fun • Graduating to Raydium Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;