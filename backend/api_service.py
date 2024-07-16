import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from github_search import fetch_all_files  # Ensure this is imported
from analyze_code import analyzer, analyzer_langChain, analyzer_streamed

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/store-apikey', methods=['POST'])
def store_apikey():
    """
    API endpoint to store the API key in a .env file.
    """
    data = request.json
    apikey = data.get('apikey')
    github_token = data.get('github_token')

    if not apikey:
        return jsonify({'error': 'API key is required'}), 400

    with open('.env', 'a') as f:
        f.write(f'GEMINI_API_KEY={apikey}\n')
        if github_token:
            f.write(f'GITHUBTOKEN={github_token}\n')

    return jsonify({'message': 'API key stored successfully'}), 200

@app.route('/summarise', methods=['POST'])
def search_code():
    """
    API endpoint to retrieve file content from GitHub.

    Request JSON Body:
    - username (str): username for GitHub
    - repo (str): repo name for GitHub
    - question (str): question to ask the model

    Returns:
    - JSON: A response containing the analysis of the code contents.
    """
    data = request.json
    username = data['username']
    repo = data['repo']
    question = data['question']

    output = fetch_all_files(owner=username, repo=repo)
    llm_input = ''
    for file in output:
        file_content = f"File name: {file[0]}\nCode:\n{file[1]}\n\n"
        llm_input += file_content

    ans = analyzer(code_content=llm_input, question=question)
    return jsonify(ans)

if __name__ == '__main__':
    app.run(debug=True)
