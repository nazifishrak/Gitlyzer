'use client';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Clipboard } from 'flowbite-react';

export default function Home() {
  const [repo, setRepo] = useState('');
  const [question, setQuestion] = useState('Write');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [endpoint, setEndpoint] = useState('summarise');
  const [loadMessage, setLoadMessage] = useState('Analyzing ⚡...');
  const [questionLabel, setQuestionLabel] = useState('Question');
  const [showPopup, setShowPopup] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [githubApiKey, setGithubApiKey] = useState('');

  useEffect(() => {
    const storedGeminiApiKey = localStorage.getItem('gemini_api_key');
    const storedGithubApiKey = localStorage.getItem('github_api_key');
    
    if (!storedGeminiApiKey || !storedGithubApiKey) {
      setShowPopup(true);
    } else {
      setGeminiApiKey(storedGeminiApiKey);
      setGithubApiKey(storedGithubApiKey);
    }
  }, []);

  const handleApiKeySubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('gemini_api_key', geminiApiKey);
    localStorage.setItem('github_api_key', githubApiKey);
    setShowPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse(''); // Clear the previous response
    const body = {
      username: username,
      repo: repo,
      question: question,
      git_api_key: githubApiKey,
      gemini_api_key: geminiApiKey

      
    };

    try {
      const res = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'git_api_key': `${githubApiKey}`, 
          'gemini_api_key': `${geminiApiKey}`
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
    <div className="relative min-h-screen">
      {/* Background pattern and effect */}
      <div className="absolute inset-0 -z-10 bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] ">
        <div className="absolute top-0 z-[-2] h-full w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      {/* Main content */}
      <div className="">
        <div className="shadow-md rounded-lg p-8 w-full">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-extrabold mt-6 mb-6 text-white">Gitlyzer ⚡️</h1>
          </div>

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
              <label htmlFor="question" className="block text-sm font-bold mb-2 text-white">{questionLabel}</label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => { setQuestion(e.target.value); }}
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
          {response && <Clipboard.WithIconText className="justify-end fixed top-10" valueToCopy={response} />}

          {isLoading && (
            <div className="flex justify-center items-center mt-6">
              <div className="px-3 py-1 text-xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                {loadMessage}
              </div>
            </div>
          )}

          {response && (
            <div className="mt-6">
              <Markdown
                className="prose prose-lg text-white mx-auto"
                options={{
                  overrides: {
                    h1: {
                      component: 'h1',
                      props: {
                        className: 'text-4xl font-bold text-white mb-4',
                      },
                    },
                    h2: {
                      component: 'h2',
                      props: {
                        className: 'text-3xl font-semibold text-white mb-3',
                      },
                    },
                    h3: {
                      component: 'h3',
                      props: {
                        className: 'text-2xl font-medium text-white mb-2',
                      },
                    },
                    p: {
                      component: 'p',
                      props: {
                        className: 'text-lg leading-relaxed text-white mb-6',
                      },
                    },
                    img: {
                      component: 'img',
                      props: {
                        className: 'custom-img mx-auto rounded-lg object-cover shadow-lg mb-6',
                      },
                    },
                    a: {
                      component: 'a',
                      props: {
                        className: 'text-blue-400 hover:underline',
                      },
                    },
                    ul: {
                      component: 'ul',
                      props: {
                        className: 'list-disc list-inside mb-6',
                      },
                    },
                    li: {
                      component: 'li',
                      props: {
                        className: 'mb-2',
                      },
                    },
                  },
                }}
              >
                {response}
              </Markdown>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-black font-bold mb-4">Enter API Keys</h2>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div>
                <label htmlFor="geminiApiKey" className="block text-black text-sm font-bold mb-2">Gemini API Key</label>
                <input
                  type="text"
                  id="geminiApiKey"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  required
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div>
                <label htmlFor="githubApiKey" className="block text-black text-sm font-bold mb-2">GitHub API Key</label>
                <input
                  type="text"
                  id="githubApiKey"
                  value={githubApiKey}
                  onChange={(e) => setGithubApiKey(e.target.value)}
                  required
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Save API Keys
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
