import React, { useState } from 'react';

const SettingsModal = ({ geminiApiKey, githubApiKey, onSave, onClose }) => {
  const [newGeminiApiKey, setNewGeminiApiKey] = useState(geminiApiKey);
  const [newGithubApiKey, setNewGithubApiKey] = useState(githubApiKey);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(newGeminiApiKey, newGithubApiKey);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-black font-bold mb-4">Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="geminiApiKey" className="block text-black text-sm font-bold mb-2">Gemini API Key</label>
            <input
              type="text"
              id="geminiApiKey"
              value={newGeminiApiKey}
              onChange={(e) => setNewGeminiApiKey(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div>
            <label htmlFor="githubApiKey" className="block text-black text-sm font-bold mb-2">GitHub API Key</label>
            <input
              type="text"
              id="githubApiKey"
              value={newGithubApiKey}
              onChange={(e) => setNewGithubApiKey(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;