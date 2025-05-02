import React from 'react';
import '../styles/TopicCard.css';
import ArrowsPointingOutIcon from '../assets/icons/arrows-pointing-out.png';

const TopicCard = ({ topic, logo, backgroundColor, content, readTime, onClick }) => {
  const getHighlightColor = (topic) => {
    const colors = {
      'Technology': '222A54',
      'Health': '526E0C',
      'Business': '216E55',
      'General': '2D3A46',
      'Sports': 'AB133E',
      'Science': '280F6D',
      'Entertainment': 'C56511'
    };
    return colors[topic] || '222A54'; // Default to Technology color if topic not found
  };

  const getTopicKeywords = (topic) => {
    const keywords = {
      'Technology': [
        'AI', 'artificial intelligence', 'quantum', 'blockchain', 'sustainable',
        'breakthrough', 'revolutionary', 'innovative', 'transformative', 'pioneering',
        'groundbreaking', 'cutting-edge', 'state-of-the-art', 'next-generation',
        'unprecedented', 'milestone', 'landmark', 'seminal', 'paradigm shift',
        'machine learning', 'deep learning', 'neural network', 'algorithm', 'data science',
        'cybersecurity', 'encryption', 'cloud computing', 'edge computing', '5G',
        'virtual reality', 'augmented reality', 'metaverse', 'digital', 'automation',
        'robotics', 'nanotechnology', 'biotechnology', 'genomics', 'cryptocurrency'
      ],
      'Health': [
        'treatment', 'therapy', 'vaccine', 'clinical trial', 'medical breakthrough',
        'healthcare', 'wellness', 'prevention', 'diagnosis', 'recovery',
        'symptom', 'patient', 'doctor', 'hospital', 'medicine',
        'research', 'study', 'findings', 'discovery', 'disease',
        'infection', 'virus', 'bacteria', 'immune system', 'vaccination',
        'surgery', 'rehabilitation', 'mental health', 'nutrition', 'fitness',
        'epidemic', 'pandemic', 'outbreak', 'public health', 'health policy',
        'pharmaceutical', 'drug', 'medication', 'prescription', 'side effect'
      ],
      'Business': [
        'market', 'investment', 'economy', 'growth', 'revenue',
        'profit', 'strategy', 'innovation', 'leadership', 'management',
        'startup', 'venture', 'funding', 'acquisition', 'merger',
        'stock', 'share', 'dividend', 'IPO', 'market share',
        'competition', 'industry', 'sector', 'enterprise', 'corporation',
        'entrepreneur', 'founder', 'CEO', 'board', 'shareholder',
        'financial', 'capital', 'asset', 'liability', 'equity',
        'trade', 'commerce', 'supply chain', 'logistics', 'distribution'
      ],
      'General': [
        'global', 'world', 'international', 'nation', 'government',
        'policy', 'law', 'rights', 'society', 'community',
        'public', 'citizen', 'population', 'demographic', 'trend',
        'development', 'progress', 'change', 'impact', 'crisis',
        'emergency', 'disaster', 'conflict', 'peace', 'security',
        'education', 'culture', 'tradition', 'heritage', 'identity',
        'environment', 'climate', 'sustainability', 'conservation', 'pollution',
        'infrastructure', 'transportation', 'urban', 'rural', 'development'
      ],
      'Sports': [
        'championship', 'tournament', 'competition', 'athlete', 'team',
        'victory', 'defeat', 'record', 'performance', 'training',
        'coach', 'player', 'match', 'game', 'season',
        'league', 'champion', 'medal', 'trophy', 'score',
        'stadium', 'arena', 'fan', 'spectator', 'broadcast',
        'Olympics', 'World Cup', 'championship', 'playoff', 'final',
        'professional', 'amateur', 'college', 'high school', 'youth',
        'coaching', 'training', 'fitness', 'endurance', 'strength'
      ],
      'Science': [
        'research', 'discovery', 'experiment', 'study', 'findings',
        'scientist', 'laboratory', 'data', 'analysis', 'theory',
        'hypothesis', 'observation', 'publication', 'peer review', 'methodology',
        'innovation', 'breakthrough', 'advancement', 'development', 'physics',
        'chemistry', 'biology', 'astronomy', 'geology', 'ecology',
        'climate', 'environment', 'evolution', 'genetics', 'neuroscience',
        'technology', 'engineering', 'mathematics', 'statistics', 'computer science',
        'space', 'universe', 'planet', 'star', 'galaxy'
      ],
      'Entertainment': [
        'film', 'movie', 'television', 'show', 'series',
        'actor', 'director', 'producer', 'premiere', 'release',
        'award', 'nomination', 'performance', 'artist', 'music',
        'album', 'concert', 'festival', 'entertainment', 'streaming',
        'platform', 'content', 'creator', 'influencer', 'social media',
        'gaming', 'video game', 'console', 'esports', 'tournament',
        'theater', 'broadway', 'play', 'musical', 'performance',
        'celebrity', 'star', 'famous', 'popular', 'trending'
      ]
    };
    return keywords[topic] || keywords['Technology']; // Default to Technology keywords if topic not found
  };

  const highlightKeyWords = (text, topic) => {
    if (!text) return '';
    
    // Get topic-specific keywords
    const keyWords = getTopicKeywords(topic);
    
    // Create a regex pattern that matches any of the key words
    const pattern = new RegExp(`\\b(${keyWords.join('|')})\\b`, 'gi');
    
    // Replace matches with highlighted version (33 in hex = 20% opacity)
    return text.replace(pattern, match => `<span class="highlighted-word" style="background-color: #${getHighlightColor(topic)}33">${match}</span>`);
  };

  return (
    <div className="topic-card" style={{ background: backgroundColor }} onClick={onClick}>
      <div className="topic-header">
        <div className="topic-logo">
          <img src={logo} alt={topic + ' logo'} className="topic-logo-img" />
        </div>
        <div className="topic-title">{topic}</div>
      </div>
      {content && (
        <div 
          className="topic-summary"
          dangerouslySetInnerHTML={{ __html: highlightKeyWords(content, topic) }}
        />
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