import base64
import requests
from dotenv import load_dotenv
import os
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUBTOKEN')
headers = {
    'Authorization': f'token {GITHUB_TOKEN}'
}
def get_repo_content(owner, repo):
    url = f'https://api.github.com/repos/{owner}/{repo}/contents'
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def get_file_content(owner, repo, path):
    url = f'https://api.github.com/repos/{owner}/{repo}/contents/{path}'
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    content = response.json()
    return base64.b64decode(content['content']).decode('utf-8')

owner = 'nazifishrak'
repo = 'Gitlyzer'

repo_content = get_repo_content(owner, repo)
for item in repo_content:
    if item['type'] == 'file':
        file_content = get_file_content(owner, repo, item['path'])
        print(file_content)
