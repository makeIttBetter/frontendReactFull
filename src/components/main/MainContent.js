import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import logo from 'assets/logo.png'; // Assurez-vous que le chemin d'accès est correct
import styles from './Main.module.css';
import { useTheme } from 'components/guards/ThemeContext';
import {createSession} from 'api/session';
import Loader from './loader/Loader';

const MainContent = ({ 
  onSendMessage, 
  history, 
  loading 
}) => {
  const [showPrompts, setShowPrompts] = useState(true);
  const { theme } = useTheme();
  const prompts = [
    "What are the best places to visit in Paris?",
    "Can you suggest a 5-day itinerary for Tokyo?",
    "What are some budget-friendly hotels in New York?",
    "How can I travel from Rome to Florence?",
    "What are the must-try foods in Barcelona?",
    "I have 2000 dollars how much in moroccan currency ?",
  ];

  useEffect(() => {
    // console.log('History:', history);
    if (history.length > 0) {
      setShowPrompts(false);
    } else {
      setShowPrompts(true);
    }
  }, [history]);

  const handlePromptClick = async (prompt) => {
    setShowPrompts(false);
    await onSendMessage(prompt);
  };

  return (
    <div className={`${styles['main-container']} flex-1 flex flex-col items-center p-6 ${history.length > 0 ? '' : 'justify-center'} `}>
      {showPrompts ? (
        <div className={`${styles['history-container']} flex-1 p-6`}>
          <div className="flex justify-center mb-6">
            <img src={logo} alt="AiTripPlanner Logo" className="h-32" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {prompts.map((prompt, index) => (
              <div 
                key={index} 
                className={`${styles['prompt-card']} p-6 rounded-lg cursor-pointer ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'}`} 
                onClick={() => handlePromptClick(prompt)}
              >
                <h3 className={`${styles.prompt} text-lg font-semibold`}>{prompt}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={`${styles['chat-header']} flex items-center mb-4`}>
            <img src={logo} alt="Flomad Logo" className="h-8 mr-2" />
            <h1 className="text-2xl font-bold">Flomad</h1>
          </div>
          <div className={`${styles['chat-history']} bg-white p-4 rounded-lg shadow-md w-full max-w-2xl`}>
            {/* <h2 className="text-lg font-semibold mb-4 text-center">Chat History</h2> */}
            {history.map((msg, index) => (
              <div key={index} className={`message rounded-lg ${msg.messageType === 'USER' ? `text-right ${styles['user-mesg']}` : `text-left ${styles['bot-mesg']}`}`}>
                <div className={styles.p}>
                  <strong>{msg.messageType === 'USER' ? 'You' : 'Flomad'}:</strong>{' '}
                  {msg.content.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      <ReactMarkdown>{line}</ReactMarkdown>
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {loading && <Loader />}
        </>
      )}
    </div>
  );
};


export default MainContent;
