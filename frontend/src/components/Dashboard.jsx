import React from 'react';
import '../styles/Dashboard.css';
import TopicCard from './TopicCard';

const Dashboard = ({ name, topics = [] }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock data for topic content - in a real app, this would come from an API
  const mockContent = {
    Technology: {
      content: (
        <>
          <a href="#">OpenAI</a> rolls out <a href="#">GPT-5 preview</a> to select devs; <a href="#">Meta</a> launches new foundation model: <a href="#">CodeGen++</a>
        </>
      ),
      readTime: '3-min read'
    },
    Sports: {
      content: 'Latest sports updates and highlights from around the world.',
      readTime: '5-min read'
    },
    Entertainment: {
      content: 'Breaking entertainment news and celebrity updates.',
      readTime: '4-min read'
    },
    Business: {
      content: 'Market trends and business insights for the day.',
      readTime: '6-min read'
    },
    Health: {
      content: 'Latest health research and wellness tips.',
      readTime: '4-min read'
    },
    Science: {
      content: 'Recent scientific discoveries and breakthroughs.',
      readTime: '5-min read'
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="greeting">
          {getGreeting()},<br />
          {name}
        </div>
        <div className="digest-section">
          <div className="digest-text">I want to digest...</div>
          <input type="text" className="digest-input" placeholder="Search topics..." />
        </div>
        <div className="profile-icon">{name.charAt(0).toUpperCase()}</div>
      </div>
      
      <div className="content-card">
        <h1>Your DailyDrip for Today</h1>
        <div className="subtitle">Here's a quick rundown of what's happening in the world you care about.</div>
        
        <div className="topics-grid">
          {topics.map((topic) => (
            <TopicCard
              key={topic}
              topic={topic}
              content={mockContent[topic]?.content}
              readTime={mockContent[topic]?.readTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 