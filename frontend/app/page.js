"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Home() {
  const [repo, setRep] = useState("");
  const [question, setQuestion] = useState("Write");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState("");
  const [endpoint, setEndpoint] = useState("search_code");
  const [clipboard, setClipboard] = useState(false);
  const [loadMessage, setLoadMessage] = useState("Analyzing ⚡...");
  const [questionLabel, setQuestionLabel] = useState("Question");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      username: username,
      repo: repo,
    };

    try {
      const res = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      console.log(json);
      let output_str = "";
      for (const value of json) {
        if (value && value.length > 1 && value[1]) {
          output_str += value[1];
        } else {
          console.warn("Encountered undefined value:", value);
        }
      }
      setResponse(output_str);
      if (res.status === 200) {
        console.log(json);
      }
    } catch (error) {
      console.error("Error generating", error);
      setResponse({ error: "Error analysing" });
      alert("Error analysing");
    } finally {
      setIsLoading(false);
    }
  };

  const onClipboardClick = (prompt) => {
    navigator.clipboard.writeText(prompt);
    setClipboard(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background pattern and effect */}
      <div className="absolute inset-0 -z-10 bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] ">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      {/* Main content */}
      <div className="">
        <div className="shadow-md rounded-lg p-8 w-full">
          <div className="text-center mb-6">
            <Image
              src={"https://pngimg.com/uploads/github/github_PNG23.png"}
              height={100}
              width={300}
              alt="Github logo"
              className="justify-start"
            />
            <h1 className="text-5xl font-extrabold mt-6 mb-6 text-white">
              Gitlyzer ⚡️
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="md:flex md:space-x-6">
              <div className="flex-1">
                <label
                  htmlFor="repo"
                  className="block text-sm font-bold mb-2 text-white"
                >
                  Repository Name
                </label>
                <input
                  type="text"
                  id="repo"
                  value={repo}
                  onChange={(e) => setRep(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-black placeholder-gray-300 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold mb-2 text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                  className="w-full text-black px-3 py-2 placeholder-gray-300 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="question"
                className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
              >
                {questionLabel}
              </label>
              <div className="grid grid-cols-8 w-full">
                <input
                  type="text"
                  id="question"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  required
                  className="col-span-6 px-3 py-2 text-black placeholder-gray-300 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    onClipboardClick(question);
                  }}
                  class="col-span-2 relative inline-flex items-center justify-center px-3 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {clipboard ? "Copied!" : "Copy"}
                </button>
              </div>
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

          {isLoading ? (
            <div className="flex justify-center items-center mt-6">
              <div className="px-3 py-1 text-xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                {loadMessage}
              </div>
            </div>
          ) : (
            response && (
              <div className="mt-6">
                {/* <Markdown
                  className="prose prose-lg dark:prose-dark text-gray-700 dark:text-gray-300 mx-auto"
                  options={{
                    overrides: {
                      h1: {
                        component: 'h1',
                        props: {
                          className: 'text-4xl font-bold text-gray-800 dark:text-white mb-4',
                        },
                      },
                      h2: {
                        component: 'h2',
                        props: {
                          className: 'text-3xl font-semibold text-gray-800 dark:text-white mb-3',
                        },
                      },
                      h3: {
                        component: 'h3',
                        props: {
                          className: 'text-2xl font-medium text-gray-800 dark:text-white mb-2',
                        },
                      },
                      p: {
                        component: 'p',
                        props: {
                          className: 'text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6',
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
                          className: 'text-blue-600 dark:text-blue-400 hover:underline',
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
                </Markdown> */}
                {response}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
