import React, { useState } from 'react';
import '../../styles/dashboard/Dashboard.css';
import TopicCard from '../topics/TopicCard';
import TechLogo from '../../assets/images/Tech_Avatars.png';
import HealthLogo from '../../assets/images/Health_Avatars.png';
import BusinessLogo from '../../assets/images/Business_Avatars.png';
import GeneralLogo from '../../assets/images/General_Avatars.png';
import ScienceLogo from '../../assets/images/Science_Avatars.png';
import SportsLogo from '../../assets/images/Sports_Avatars.png';
import EntertainmentLogo from '../../assets/images/Entertainment_Avatars.png';
import ExpandedTopicModal from '../topics/ExpandedTopicModal';

const topicData = [
  {
    topic: 'Technology',
    logo: TechLogo,
    backgroundColor: 'rgba(216, 232, 243, 0.5)'
  },
  {
    topic: 'Health',
    logo: HealthLogo,
    backgroundColor: 'rgba(242, 255, 209, 0.5)'
  },
  {
    topic: 'Business',
    logo: BusinessLogo,
    backgroundColor: 'rgba(231, 249, 243, 0.5)'
  },
  {
    topic: 'General',
    logo: GeneralLogo,
    backgroundColor: 'rgba(224, 230, 235, 0.5)'
  },
  {
    topic: 'Science',
    logo: ScienceLogo,
    backgroundColor: 'rgba(228, 226, 243, 0.5)'
  },
  {
    topic: 'Sports',
    logo: SportsLogo,
    backgroundColor: 'rgba(235, 230, 239, 0.5)'
  },
  {
    topic: 'Entertainment',
    logo: EntertainmentLogo,
    backgroundColor: 'rgba(253, 239, 226, 0.5)'
  }
];

const Dashboard = ({ name, topics = [] }) => {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Helper to truncate summary text
  const truncateWords = (text, numWords) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= numWords) return text;
    return words.slice(0, numWords).join(' ') + '...';
  };

  // Filter topicData to only include selected topics
  const filteredTopics = topicData.filter(topic => topics.includes(topic.topic));

  // ⭐️⭐️ placeholder for backend ⭐️⭐️: 
  // - Each topic should have a 35-40 word summary
  // - Read time should be calculated based on word count (average reading speed: 200 words/minute)
  // - Topics should be fetched from backend based on user preferences
  const topicContent = {
    'Technology': {
      content: 'AI integration has revolutionized industries with generative models powering creative workflows and decision-making systems. Quantum computing achieved practical breakthroughs in drug discovery and materials science. The global semiconductor supply chain has stabilized following years of shortages, enabling ambitious next-generation hardware deployments.',
      readTime: '3-min read'
    },
    'Health': {
      content: 'New study reveals breakthrough in Alzheimer\'s treatment; WHO updates global health guidelines for 2024',
      readTime: '4-min read'
    },
    'Business': {
      content: 'Sustainability has moved from optional to mandatory in corporate strategy as climate regulations tightened worldwide. Remote and hybrid work models permanently transformed office real estate markets. Supply chain resiliency became the primary focus for multinational corporations following continued geopolitical disruptions.',
      readTime: '5-min read'
    },
    'General': {
      content: 'Breaking news from around the world: Major events and developments shaping our global community',
      readTime: '4-min read'
    },
    'Science': {
      content: 'NASA announces new Mars mission; Breakthrough in quantum computing achieved',
      readTime: '6-min read'
    },
    'Sports': {
      content: "The Paris Olympics showcased next-generation athletic achievements and technological integration. Women's professional leagues experienced unprecedented growth in viewership and commercial value. Athlete-led media platforms disrupted traditional broadcasting models, giving competitors direct control over their narratives and monetization opportunities.",
      readTime: '3-min read'
    },
    'Entertainment': {
      content: 'Streaming services underwent major consolidation through mergers while investing heavily in regional content production hubs. Extended reality experiences blurred boundaries between gaming, film, and social media. AI-generated content sparked both creative innovations and industry-wide debates about intellectual property and compensation.',
      readTime: '4-min read'
    }
  };

  return (
    <div className="dashboard-container">
      {/* Overlay and Modal */}
      {expandedTopic && (
        <>
          <div className="modal-overlay" onClick={() => setExpandedTopic(null)} />
          <ExpandedTopicModal
            topic={expandedTopic}
            onClose={() => setExpandedTopic(null)}
          />
        </>
      )}
      <div className="dashboard-header">
        <div className="greeting">
          {getGreeting()},<br />
          {name}
        </div>
        <div className="profile-icon">{name?.charAt(0).toUpperCase()}</div>
      </div>
      <div className="ai-digest-center">
        <div className="digest-text ai-digest-label">What do you want to explore today?</div>
        <input type="text" className="digest-input ai-digest-input" placeholder="Search topics..." />
        <div className="chevron-down">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 15L18 23L26 15" stroke="#A0A0A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="content-card">
        <h1>Your DailyDrip for Today</h1>
        <div className="subtitle">Here's a quick rundown of what's happening in the world you care about.</div>
        
        <div className="topics-grid">
          {filteredTopics.map(({ topic, logo, backgroundColor }) => (
            <TopicCard
              key={topic}
              topic={topic}
              logo={logo}
              backgroundColor={backgroundColor}
              content={topicContent[topic]?.content}
              readTime={topicContent[topic]?.readTime}
              onClick={() => setExpandedTopic(topic)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 