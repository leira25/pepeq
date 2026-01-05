import React from 'react';

const FeatureCards = () => {
  const cards = [
    {
      label: 'AI Chat',
      title: 'PEPIQ AI Agent',
      tags: ['ElizaOS', '24/7 Available'],
      desc: 'Chat with our AI agent built on ElizaOS Cloud. Ask questions, get information, have conversations intelligent interaction you can use right now.'
    },
    {
      label: 'Integration',
      title: '402X Protocol',
      tags: ['Cross-Protocol', 'Seamless'],
      desc: 'Built with 402X integration technology for enhanced connectivity across Solana\'s ecosystem. Designed for the future.'
    },
    {
      label: 'Community',
      title: 'Fair Launch',
      tags: ['0% Tax', 'LP Burned'],
      desc: '100% community-owned with LP burned and contract renounced. No team allocation. True decentralization from day one.'
    },
    {
      label: 'Security',
      title: 'Protected',
      tags: ['Renounced', 'Locked'],
      desc: 'Liquidity permanently locked, ownership renounced. Your investment is secured on Solana\'s battle-tested infrastructure.'
    }
  ];

  return (
    <section id="features" className="feature-cards">
      <div className="container-wide">
        {cards.map((card, index) => (
          <div key={index} className="fcard">
            <div className="fcard-label">{card.label}</div>
            <h3>{card.title}</h3>
            <div className="fcard-tags">
              {card.tags.map((tag, i) => <span key={i}>{tag}</span>)}
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;