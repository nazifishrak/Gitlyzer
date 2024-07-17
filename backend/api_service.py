import requests
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from github_search import fetch_all_files
from analyze_code import analyzer, analyzer_langChain, analyzer_streamed

app = Flask(__name__)
# EXPOSED API INTERFACE
CORS(app)

@app.route('/summarise', methods=['POST'])
def search_code():
    """
    API endpoint to retrieve file content github

    Request JSON Body:
    - username (str): username for github
    - repo (str): repo name for github

    Returns:
    - JSON: A response containing a list of code contents or an error message.
    """
    # TODO: Parse the request body and call merge_code_content
    data = request.json
    username = data['username']
    repo = data['repo']
    question = data['question']
    # gitlab_api = request.headers.get('git_api_key')
    # gemini_api = request.headers.get('gemini_api_key')
    gitlab_api = data['git_api_key']
    gemini_api = data['gemini_api_key']
    print("****************************")
    print(gitlab_api)
    print(gemini_api)
    output = fetch_all_files(owner=username, repo=repo, git_api_key=gitlab_api)
    llm_input = ''
    for file in output:
        file_content = f"File name {file[0]} and here is the corresponding code {file[1]}"
        llm_input+=file_content
    print(llm_input)
    print(question)
    # ans=analyzer_langChain(code_content=llm_input,question=question)

    return Response(analyzer_streamed(code_content=llm_input, question=question, gemini_api_key=gemini_api))



    return jsonify(ans)
    




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)