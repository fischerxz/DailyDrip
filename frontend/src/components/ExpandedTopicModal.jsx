import React, { useEffect } from 'react';
import TechLogo from '../assets/images/Tech_Avatars.png';
import ArticleImg1 from '../assets/images/article1.png';
import ArticleImg2 from '../assets/images/article2.png';
import ArticleImg3 from '../assets/images/article3.png';
import ArticleImg4 from '../assets/images/article4.png';
import '../styles/Dashboard.css';

const techNews = [
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
  },
  {
    title: "OpenAI debuts GPT-4o, a faster and more affordable AI model",
    source: "OpenAI Blog",
    date: "May 13, 2024",
    image: ArticleImg3,
    summary: `OpenAI has released GPT-4o, a new flagship model that is faster and cheaper to run than its predecessor. GPT-4o brings improvements in reasoning, multilingual support, and can process both text and images. The model is now available via API and ChatGPT.`
  },
  {
    title: "NVIDIA announces new AI chips for data centers and edge devices",
    source: "Reuters",
    date: "May 22, 2024",
    image: ArticleImg4,
    summary: `NVIDIA unveiled its latest AI chips, designed to accelerate machine learning workloads in data centers and edge devices. The new chips promise significant performance gains and energy efficiency, targeting the growing demand for AI infrastructure.`
  }
];

const ExpandedTopicModal = ({ topic, onClose }) => {
  // Only Technology is implemented for now
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (topic !== 'Technology') return null;

  return (
    <div className="expanded-modal-card" style={{ background: '#EBF3F9', fontFamily: 'Helvetica, sans-serif' }}>
      <button className="modal-close-btn" onClick={onClose}>&#10005;</button>
      <div className="expanded-modal-header">
        <span className="expanded-modal-icon">
          <img src={TechLogo} alt="Tech Logo" style={{ width: 32, height: 32 }} />
        </span>
        <span className="expanded-modal-title" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400, fontSize: '2rem', color: '#222A54' }}>Technology</span>
      </div>
      <div className="expanded-modal-news-list">
        {techNews.map((news, idx) => (
          <div className="expanded-modal-news-card" key={idx} style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400 }}>
            <div className="expanded-modal-news-title-row">
              <span className="expanded-modal-news-title" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 400, fontSize: '1.25rem', color: '#222A54' }}>{news.title}</span>
              <span className="expanded-modal-news-like-row">
                <span className="like-btn">👍</span>
                <span className="like-btn">👎</span>
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
        ))}
      </div>
    </div>
  );
};

export default ExpandedTopicModal; 