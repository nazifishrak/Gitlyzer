import base64
import requests
from dotenv import load_dotenv
import os
from typing import List, Tuple

# Load environment variables
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUBTOKEN')

# Set headers for authorization
headers = {
    'Authorization': f'token {GITHUB_TOKEN}'
}

def get_repo_content(owner: str, repo: str, path: str = '') -> List[dict]:
    """
    Fetch the contents of a GitHub repository.

    Parameters:
    - owner (str): GitHub username
    - repo (str): Repository name
    - path (str): Path within the repository (default is root)
    
    Returns:
    - List[dict]: List of repository contents
    """
    url = f'https://api.github.com/repos/{owner}/{repo}/contents/{path}'
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def get_file_content(owner: str, repo: str, path: str) -> str:
    """
    Fetch the content of a file in a GitHub repository.

    Parameters:
    - owner (str): GitHub username
    - repo (str): Repository name
    - path (str): Path to the file within the repository
    
    Returns:
    - str: Decoded content of the file
    """
    url = f'https://api.github.com/repos/{owner}/{repo}/contents/{path}'
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    content = response.json()
    return base64.b64decode(content['content']).decode('utf-8')

def fetch_all_files(owner, repo, path='')->List[Tuple[str, str]]:
    """
    Recursively fetch the content of all code files in a GitHub repository.

    Parameters:
    - owner (str): GitHub username
    - repo (str): Repository name
    - path (str): Path within the repository (default is root)
    
    Returns:
    - List[Tuple[str, str]]: List of tuples containing file paths and their content
    """
    repo_content = get_repo_content(owner, repo, path)
    code_files = []

    for item in repo_content:
        if item['type'] == 'file' and item['name'].endswith(('.py', '.js', '.java', '.cpp', '.c', '.html', '.css', ".jsx",".tsx", "package.json")):
            file_content = get_file_content(owner, repo, item['path'])
            code_files.append((item['path'], file_content))
        elif item['type'] == 'dir':
            # Recursively fetch contents of subdirectories
            code_files.extend(fetch_all_files(owner, repo, item['path']))
    
    return code_files


owner = 'nazifishrak'
repo = 'Portfolio-Website'

try:
    files = fetch_all_files(owner, repo)
    print(files[0])
except Exception as e:
    print(f"Error: {e}")
