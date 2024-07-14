import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from github_search import fetch_all_files
from analyze_code import analyzer
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
    output = fetch_all_files(owner=username, repo=repo)
    llm_input = ''
    for file in output:
        file_content = f"File name {file[0]} and here is the corresponding code {file[1]}"
        llm_input+=file_content
    print(llm_input)

    ans=analyzer(code_content=llm_input)


    return jsonify(ans)
    




if __name__ == '__main__':
    app.run(debug=True)