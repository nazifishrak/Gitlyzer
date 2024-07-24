'use client'
import React, { useState } from 'react';

const GitlyzerForm = ({ geminiApiKey, githubApiKey, setResponse, setIsLoading }) => {
  const [repo, setRepo] = useState('');
  const [question, setQuestion] = useState('Write');
  const [username, setUsername] = useState('');
  const [endpoint, setEndpoint] = useState('summarise');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse('');
    const body = {
      username: username,
      repo: repo,
      question: question,
      git_api_key: githubApiKey,
      gemini_api_key: geminiApiKey
    };
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${backendUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.body) {
        throw new Error('No response body');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: !done });
        setResponse((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Error generating', error);
      setResponse('Error analyzing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="md:flex md:space-x-6">
        <div className="flex-1">
          <label htmlFor="repo" className="block text-sm font-bold mb-2 text-white">Repository Name</label>
          <input
            type="text"
            id="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            className="w-full px-3 py-2 text-black placeholder-gray-300 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="username" className="block text-sm font-bold mb-2 text-white">User Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full text-black px-3 py-2 placeholder-gray-300 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700"
          />
        </div>
      </div>
      <div>
        <label htmlFor="question" className="block text-sm font-bold mb-2 text-white">Question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full px-3 py-2 text-black placeholder-gray-300 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700"
        />
      </div>
      <div className="rounded-xl flex justify-center items-center">
        <div className="rounded-xl relative inline-flex group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Analyze Repository
          </button>
        </div>
      </div>
    </form>
  );
};

export default GitlyzerForm;