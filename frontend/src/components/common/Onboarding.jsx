import React, { useState } from 'react';
import '../../styles/common/Onboarding.css';
import arrowRightIcon from '../../assets/icons/arrow-right.png';
import logo from '../../assets/images/logo.png';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Topic list
  const topics = [
    'Business',
    'Entertainment',
    'General',
    'Health',
    'Science',
    'Sports',
    'Technology',
  ];

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleComplete = () => {
    if (typeof onComplete === 'function') {
      // ⭐️⭐️ placeholder for backend ⭐️⭐️:
      // - Send user preferences to backend:
      //   - User name
      //   - Selected topics
      //   - Timestamp
      //   - Device info
      // - Create user profile
      // - Initialize user preferences
      onComplete(name, selectedTopics);
    } else {
      console.error('onComplete is not a function');
    }
  };

  const NextButton = ({ children, ...props }) => (
    <div className="button-wrapper sticky-bottom">
      <button className="next-button" {...props}>
        {children}
        <img src={arrowRightIcon} alt="Next" className="next-button-icon" />
      </button>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="onboarding-step">
            <div className="content-wrapper">
              <h1>
                Welcome to
                <span className="x-logo">
                  <img src={logo} alt="DailyDrip Logo" className="logo-image" />
                </span>
                DailyDrip.
              </h1>
              <div className="subtitle">Your smarter, faster way to stay informed.</div>
            </div>
            <NextButton onClick={() => setStep(1)}>
              Let's Get Started
            </NextButton>
          </div>
        );
      case 1:
        return (
          <div className="onboarding-step">
            <div className="content-wrapper">
              <h1>Let's Personalize Your Feed.</h1>
              <div className="subtitle">What should we call you?</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name..."
                className="name-input"
              />
            </div>
            <NextButton 
              onClick={() => setStep(2)}
              disabled={!name.trim()}
            >
              Next
            </NextButton>
          </div>
        );
      case 2:
        return (
          <div className="onboarding-step">
            <div className="content-wrapper">
              <h1>Pick your favorite topics.</h1>
              <div className="subtitle">We'll build your DailyDrip around them.</div>
              <div className="subtext">You can update this anytime in settings.</div>
              <div className="topics-flex">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className={`topic-button ${selectedTopics.includes(topic) ? 'selected' : ''}`}
                    onClick={() => handleTopicToggle(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
            <NextButton 
              onClick={handleComplete}
              disabled={selectedTopics.length === 0}
            >
              See My DailyDrip
            </NextButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container with-bottom-padding">
      {renderStep()}
    </div>
  );
};

export default Onboarding; 