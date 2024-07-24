'use client'
import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Clipboard } from 'flowbite-react';

const ResponseDisplay = ({ response, isLoading }) => {
  const loadMessage = 'Analyzing ⚡...';

  return (
    <div>
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
  );
};

export default ResponseDisplay;