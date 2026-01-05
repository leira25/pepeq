import React from 'react';

const Tokenomics = () => {
  const features = [
    { title: '0% Tax', desc: 'No buy or sell fees' },
    { title: 'LP Burned', desc: 'Liquidity locked forever' },
    { title: 'Contract Renounced', desc: 'True decentralization' },
    { title: '100% Community', desc: 'No team allocation' }
  ];

  return (
    <section id="tokenomics" className="tokenomics-section">
      <div className="container-narrow">
        <div className="section-header-center">
          <span className="section-tag">Tokenomics</span>
          <h2>Simple & Fair Distribution</h2>
        </div>
        <div className="token-supply-box">
          <div className="supply-label">Total Supply</div>
          <div className="supply-number">1B</div>
          <div className="supply-desc">PEPIQ Tokens</div>
        </div>
        <div className="token-features-list">
          {features.map((feat, index) => (
            <div key={index} className="token-feat">
              <div className="feat-title">{feat.title}</div>
              <div className="feat-desc">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;