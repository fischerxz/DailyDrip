import React from 'react';
import '../styles/TopicCard.css';

const TopicCard = ({ topic, content, readTime }) => {
  // Define color schemes for different topics
  const topicStyles = {
    Technology: {
      color: '#222A54',
      backgroundColor: 'rgba(216, 232, 243, 0.50)'
    },
    Sports: {
      color: '#AB133E',
      backgroundColor: 'rgba(235, 230, 239, 0.50)'
    },
    Entertainment: {
      color: '#C56511',
      backgroundColor: 'rgba(253, 239, 226, 0.50)'
    },
    Business: {
      color: '#216E55',
      backgroundColor: 'rgba(231, 249, 243, 0.50)'
    },
    Health: {
      color: '#5B2A86',
      backgroundColor: 'rgba(237, 230, 239, 0.50)'
    },
    Science: {
      color: '#2A5B86',
      backgroundColor: 'rgba(230, 239, 243, 0.50)'
    }
  };

  const style = topicStyles[topic] || {
    color: '#222A54',
    backgroundColor: 'rgba(216, 232, 243, 0.50)'
  };

  return (
    <div className="topic-card" style={{ background: style.backgroundColor }}>
      <div className="topic-header">
        <div className="topic-icon" style={{ background: style.backgroundColor }}>
          <div className="icon-inner" style={{ background: style.color }}></div>
        </div>
        <div className="topic-title">{topic}</div>
      </div>
      
      {content && (
        <div className="topic-content">
          {content}
          {readTime && (
            <div className="read-time">
              <span className="read-time-icon">⏱</span>
              {readTime}
            </div>
          )}
        </div>
      )}
      
      <div className="view-sources">
        <span>View Sources</span>
        <div className="sources-icon"></div>
      </div>
    </div>
  );
};

export default TopicCard; 