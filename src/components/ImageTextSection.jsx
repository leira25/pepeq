import React from 'react';

const ImageTextSection = ({ id, imgSrc, textLabel, title, paragraphs, reverse = false }) => {
  return (
    <section id={id} className={`image-text-section ${reverse ? 'reverse' : ''}`}>
      <div className="container">
        <img src={imgSrc} alt={title} className="section-img" />
        <div className="section-text">
          <span className="text-label">{textLabel}</span>
          <h2>{title}</h2>
          {paragraphs.map((p, index) => <p key={index}>{p}</p>)}
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;