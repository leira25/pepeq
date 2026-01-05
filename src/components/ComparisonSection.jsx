import React from 'react';

const ComparisonSection = () => {
  const comparisons = [
    { label: 'Interaction', old: 'Traditional: Buy and hold, nothing to do', new: 'PEPIQ: Chat with AI agent anytime' },
    { label: 'Support', old: 'Traditional: Wait for team response', new: 'PEPIQ: AI answers 24/7 instantly' },
    { label: 'Utility', old: 'Traditional: Zero utility, pure speculation', new: 'PEPIQ: Real AI you can use right now' },
    { label: 'Ownership', old: 'Traditional: Team-controlled', new: 'PEPIQ: 100% community, LP burned' }
  ];

  return (
    <section className="comparison-section">
      <div className="container-narrow">
        <div className="section-header-center">
          <span className="section-tag">Paradigm Shift</span>
          <h2>Traditional Memes vs AI-Powered Memes</h2>
        </div>
        <p className="comparison-intro">Most meme coins are just tokens with no purpose. PEPIQ combines viral culture with real AI technology you can interact with today.</p>
        <div className="comparison-table">
          {comparisons.map((comp, index) => (
            <div key={index} className="comparison-row">
              <div className="comp-label">{comp.label}</div>
              <div className="comp-old">{comp.old}</div>
              <div className="comp-new">{comp.new}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;