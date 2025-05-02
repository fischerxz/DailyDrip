import React from 'react';
import '../styles/TopicCard.css';
import ArrowsPointingOutIcon from '../assets/icons/arrows-pointing-out.png';

const TopicCard = ({ topic, logo, backgroundColor, content, readTime, onClick }) => {
  return (
    <div className="topic-card" style={{ background: backgroundColor }} onClick={onClick}>
      <div className="topic-header">
        <div className="topic-logo">
          <img src={logo} alt={topic + ' logo'} className="topic-logo-img" />
        </div>
        <div className="topic-title">{topic}</div>
      </div>
      {content && (
        <div className="topic-summary">
          {content}
        </div>
      )}
      <div className="topic-card-bottom-row">
        {readTime && (
          <div className="read-time">
            <span className="read-time-icon">⏱</span>
            {readTime}
          </div>
        )}
        <div className="view-sources">
          <span>View Sources</span>
          <img src={ArrowsPointingOutIcon} alt="View Sources Icon" className="sources-icon" />
        </div>
      </div>
    </div>
  );
};

export default TopicCard; 