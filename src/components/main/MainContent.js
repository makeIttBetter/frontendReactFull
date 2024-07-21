import React from 'react';
import logo from 'assets/logo.png'; // Assurez-vous que le chemin d'accès est correct
import styles from './Main.module.css';
import { useTheme } from 'components/guards/ThemeContext';

const MainContent = ({ onPromptClick }) => {
  const { theme } = useTheme();
  const prompts = [
    "What are the best places to visit in Paris?",
    "Can you suggest a 5-day itinerary for Tokyo?",
    "What are some budget-friendly hotels in New York?",
    "How can I travel from Rome to Florence?",
    "What are the must-try foods in Barcelona?",
    "I have 2000 dollars how much in moroccan currency ?",
  ];

  return (
    <div className={`${styles['history-container']} flex-1 p-6`}>
      <div className="flex justify-center mb-6">
        <img src={logo} alt="AiTripPlanner Logo" className="h-32" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {prompts.map((prompt, index) => (
          <div key={index} className={`${styles['prompt-card']} p-6 rounded-lg cursor-pointer ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'}`} onClick={() => onPromptClick(prompt)}>
            <h3 className={`${styles.prompt} text-lg font-semibold`}>{prompt}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
