import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from github_search import fetch_all_files
app = Flask(__name__)
# EXPOSED API INTERFACE
CORS(app)

@app.route('/search_code', methods=['POST'])
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
    return jsonify(output)
    


    

@app.route('/summarise', methods =['POST'])
# Use LLM service to summarise repo
def get_summary():
    pass





if __name__ == '__main__':
    app.run(debug=True)