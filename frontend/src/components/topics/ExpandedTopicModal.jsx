import React, { useEffect, useState } from 'react';
import TechLogo from '../../assets/images/Tech_Avatars.png';
import SportsLogo from '../../assets/images/Sports_Avatars.png';
import HealthLogo from '../../assets/images/Health_Avatars.png';
import EntertainmentLogo from '../../assets/images/Entertainment_Avatars.png';
import BusinessLogo from '../../assets/images/Business_Avatars.png';
import GeneralLogo from '../../assets/images/General_Avatars.png';
import ScienceLogo from '../../assets/images/Science_Avatars.png';
import ArticleImg1 from '../../assets/images/article1.png';
import ArticleImg2 from '../../assets/images/article2.png';
import ArticleImg3 from '../../assets/images/article3.png';
import ArticleImg4 from '../../assets/images/article4.png';
import HandThumbUp from '../../assets/icons/hand-thumb-up.png';
import HandThumbDown from '../../assets/icons/hand-thumb-down.png';
import CheckIcon from '../../assets/icons/check.png';
import XMarkIcon from '../../assets/icons/x-mark.png';
import '../../styles/dashboard/Dashboard.css';

const topicStyles = {
  Technology: { background: '#EBF3F9' },
  Sports: { background: '#F5F2F7' },
  Health: { background: '#F8FFE8' },
  Entertainment: { background: '#FEF7F0' },
  Business: { background: '#F3FCF9' },
  General: { background: '#EFF2F5' },
  Science: { background: '#F1F0F9' }
};

const topicLogos = {
  Technology: TechLogo,
  Sports: SportsLogo,
  Health: HealthLogo,
  Entertainment: EntertainmentLogo,
  Business: BusinessLogo,
  General: GeneralLogo,
  Science: ScienceLogo
};

// ⭐️⭐️ placeholder for backend ⭐️⭐️:
// - News articles should be fetched from news API
// - Each article should include:
//   - Title (max 100 chars)
//   - Source (verified news outlet)
//   - Date (ISO format)
//   - Image URL (aspect ratio 16:9)
//   - Summary (150-200 words)
// - Articles should be sorted by relevance and recency
const placeholderNews = {
  Technology: [
    {
      title: "Apple unveils new AI features for iOS 18, including on-device intelligence",
      source: "The Verge",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: `Apple announced a suite of new AI-powered features for iOS 18 at WWDC 2024, including on-device intelligence for Siri, smarter photo search, and real-time transcription. The company emphasized privacy, stating that most AI processing will happen on the device.`
    },
    {
      title: "Google launches Gemini 2, its next-gen AI model for Android",
      source: "TechCrunch",
      date: "May 15, 2024",
      image: ArticleImg2,
      summary: `Google introduced Gemini 2, its latest AI model, at Google I/O 2024. The model powers new features in Android, including advanced voice assistance, image recognition, and context-aware suggestions. Gemini 2 is designed to run efficiently on mobile devices.`
    }
  ],
  Sports: [
    {
      title: "Placeholder Sports News 1",
      source: "Sports Source",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: "This is a placeholder for sports news content. Backend integration will replace this with actual sports news."
    },
    {
      title: "Placeholder Sports News 2",
      source: "Sports Source",
      date: "June 9, 2024",
      image: ArticleImg2,
      summary: "This is a placeholder for sports news content. Backend integration will replace this with actual sports news."
    }
  ],
  Health: [
    {
      title: "Placeholder Health News 1",
      source: "Health Source",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: "This is a placeholder for health news content. Backend integration will replace this with actual health news."
    },
    {
      title: "Placeholder Health News 2",
      source: "Health Source",
      date: "June 9, 2024",
      image: ArticleImg2,
      summary: "This is a placeholder for health news content. Backend integration will replace this with actual health news."
    }
  ],
  Entertainment: [
    {
      title: "Placeholder Entertainment News 1",
      source: "Entertainment Source",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: "This is a placeholder for entertainment news content. Backend integration will replace this with actual entertainment news."
    },
    {
      title: "Placeholder Entertainment News 2",
      source: "Entertainment Source",
      date: "June 9, 2024",
      image: ArticleImg2,
      summary: "This is a placeholder for entertainment news content. Backend integration will replace this with actual entertainment news."
    }
  ],
  Business: [
    {
      title: "Placeholder Business News 1",
      source: "Business Source",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: "This is a placeholder for business news content. Backend integration will replace this with actual business news."
    },
    {
      title: "Placeholder Business News 2",
      source: "Business Source",
      date: "June 9, 2024",
      image: ArticleImg2,
      summary: "This is a placeholder for business news content. Backend integration will replace this with actual business news."
    }
  ],
  General: [
    {
      title: "Placeholder General News 1",
      source: "General Source",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: "This is a placeholder for general news content. Backend integration will replace this with actual general news."
    },
    {
      title: "Placeholder General News 2",
      source: "General Source",
      date: "June 9, 2024",
      image: ArticleImg2,
      summary: "This is a placeholder for general news content. Backend integration will replace this with actual general news."
    }
  ],
  Science: [
    {
      title: "Placeholder Science News 1",
      source: "Science Source",
      date: "June 10, 2024",
      image: ArticleImg1,
      summary: "This is a placeholder for science news content. Backend integration will replace this with actual science news."
    },
    {
      title: "Placeholder Science News 2",
      source: "Science Source",
      date: "June 9, 2024",
      image: ArticleImg2,
      summary: "This is a placeholder for science news content. Backend integration will replace this with actual science news."
    }
  ]
};

const ExpandedTopicModal = ({ topic, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!topic || !topicStyles[topic]) return null;

  // ⭐️⭐️ placeholder for backend ⭐️⭐️:
  // - Feedback should be sent to backend for:
  //   - User interest tracking
  //   - Content personalization
  //   - Analytics
  // - Store feedback in user profile
  // - Use feedback to improve future content recommendations
  const [feedback, setFeedback] = useState({}); // { [newsIdx]: 'interested' | 'not_interested' | null }
  const [hovered, setHovered] = useState({}); // { [newsIdx]: 'up' | 'down' | null }

  const handleFeedback = (idx, type) => {
    setFeedback({ ...feedback, [idx]: type });
    // ⭐️⭐️ placeholder for backend ⭐️⭐️:
    // - Send feedback to backend API
    // - Include: article ID, user ID, feedback type, timestamp
  };

  const handleHover = (idx, type) => {
    setHovered({ ...hovered, [idx]: type });
  };

  const handleHoverOut = (idx) => {
    setHovered({ ...hovered, [idx]: null });
  };

  return (
    <div className="expanded-modal-card" style={{ ...topicStyles[topic], fontFamily: 'Helvetica, sans-serif' }}>
      <button className="modal-close-btn" onClick={onClose}>&#10005;</button>
      <div className="expanded-modal-header">
        <span className="expanded-modal-icon">
          <img src={topicLogos[topic]} alt={`${topic} Logo`} style={{ width: 32, height: 32 }} />
        </span>
        <span className="expanded-modal-title" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400, fontSize: '2rem', color: '#222A54' }}>{topic}</span>
      </div>
      <div className="expanded-modal-news-list">
        {placeholderNews[topic].map((news, idx) => {
          const fb = feedback[idx] || null;
          const hv = hovered[idx] || null;
          return (
            <div className="expanded-modal-news-card" key={idx} style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400 }}>
              <div className="expanded-modal-news-title-row">
                <span className="expanded-modal-news-title" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400, fontSize: '1.25rem', color: '#222A54' }}>{news.title}</span>
                <span className="expanded-modal-news-like-row">
                  {/* Thumbs Up Button */}
                  <button
                    className={`like-btn feedback-btn up ${fb === 'interested' ? 'selected' : ''} ${hv === 'up' ? 'hovered' : ''}`}
                    onClick={() => handleFeedback(idx, 'interested')}
                    onMouseEnter={() => handleHover(idx, 'up')}
                    onMouseLeave={() => handleHoverOut(idx)}
                  >
                    {fb === 'interested' ? (
                      <>
                        <span className="feedback-icon"><img src={CheckIcon} alt="check" /></span>
                        <span className="feedback-text">Interested</span>
                      </>
                    ) : hv === 'up' ? (
                      <>
                        <span className="feedback-icon"><img src={HandThumbUp} alt="thumb up" /></span>
                        <span className="feedback-text">I'm interested</span>
                      </>
                    ) : (
                      <span className="feedback-icon"><img src={HandThumbUp} alt="thumb up" /></span>
                    )}
                  </button>
                  {/* Thumbs Down Button */}
                  <button
                    className={`like-btn feedback-btn down ${fb === 'not_interested' ? 'selected' : ''} ${hv === 'down' ? 'hovered' : ''}`}
                    onClick={() => handleFeedback(idx, 'not_interested')}
                    onMouseEnter={() => handleHover(idx, 'down')}
                    onMouseLeave={() => handleHoverOut(idx)}
                  >
                    {fb === 'not_interested' ? (
                      <>
                        <span className="feedback-icon"><img src={XMarkIcon} alt="x mark" /></span>
                        <span className="feedback-text">Not interested</span>
                      </>
                    ) : hv === 'down' ? (
                      <>
                        <span className="feedback-icon"><img src={HandThumbDown} alt="thumb down" /></span>
                        <span className="feedback-text">I'm not interested</span>
                      </>
                    ) : (
                      <span className="feedback-icon"><img src={HandThumbDown} alt="thumb down" /></span>
                    )}
                  </button>
                </span>
              </div>
              <div className="expanded-modal-news-meta" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300, fontSize: '1rem', color: '#4a4a4a', opacity: 0.7 }}>
                <span className="expanded-modal-news-source">{news.source}</span>
                <span className="expanded-modal-news-date">{news.date}</span>
              </div>
              <div className="expanded-modal-news-content-row">
                <img className="expanded-modal-news-image" src={news.image} alt="news visual" style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                <div className="expanded-modal-news-summary" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400, fontSize: '1rem', color: '#222' }}>
                  {news.summary.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandedTopicModal; 