import React, { useState } from 'react';
import Onboarding from './components/common/Onboarding';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    selectedTopics: []
  });

  const handleOnboardingComplete = (name, selectedTopics) => {
    // ⭐️⭐️ placeholder for backend ⭐️⭐️:
    // - Store user data in backend
    // - Create/update user profile
    // - Initialize user preferences
    // - Set authentication state
    console.log('Onboarding complete:', { name, selectedTopics });
    setUserData({ name, selectedTopics });
    setIsOnboarding(false);
  };

  return (
    <div className="app">
      {isOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard name={userData.name} topics={userData.selectedTopics} />
      )}
    </div>
  );
};

export default App; 