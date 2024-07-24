'use client'
import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import SettingsModal from './components/SettingsModal';
import GitlyzerForm from './components/GitlyzerForm';
import ResponseDisplay from './components/ResponseDisplay';

export default function Home() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [githubApiKey, setGithubApiKey] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedGeminiApiKey = localStorage.getItem('gemini_api_key') || '';
    const storedGithubApiKey = localStorage.getItem('github_api_key') || '';
    setGeminiApiKey(storedGeminiApiKey);
    setGithubApiKey(storedGithubApiKey);
  }, []);

  const handleApiKeySave = (newGeminiKey, newGithubKey) => {
    setGeminiApiKey(newGeminiKey);
    setGithubApiKey(newGithubKey);
    localStorage.setItem('gemini_api_key', newGeminiKey);
    localStorage.setItem('github_api_key', newGithubKey);
    setShowSettingsModal(false);
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute top-0 z-[-2] h-full w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      <div className="shadow-md rounded-lg p-8 w-full">
        <div className="text-center mb-6 relative">
          <h1 className="text-5xl font-extrabold mt-6 mb-6 text-white">Gitlyzer ⚡️</h1>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="absolute top-0 right-0 p-2 text-white hover:text-gray-300"
          >
            <Settings size={24} />
          </button>
        </div>

        <GitlyzerForm
          geminiApiKey={geminiApiKey}
          githubApiKey={githubApiKey}
          setResponse={setResponse}
          setIsLoading={setIsLoading}
        />

        <ResponseDisplay response={response} isLoading={isLoading} />
      </div>


    </div>
  );
}