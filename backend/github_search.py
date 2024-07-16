import base64
import requests
from dotenv import load_dotenv
import os
from typing import List, Tuple
# PRIVATE FILE ONLY TO BE USED FOR API SERVICE
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
    """
    E.g Response: [
  {
    "name": "file1.txt",
    "path": "path/to/file1.txt",
    "sha": "abc123",
    "size": 1234,
    "url": "https://api.github.com/repos/{owner}/{repo}/contents/path/to/file1.txt",
    "html_url": "https://github.com/{owner}/{repo}/blob/main/path/to/file1.txt",
    "git_url": "https://api.github.com/repos/{owner}/{repo}/git/blobs/abc123",
    "download_url": "https://raw.githubusercontent.com/{owner}/{repo}/main/path/to/file1.txt",
    "type": "file"
  },
  {
    "name": "subdir",
    "path": "path/to/subdir",
    "sha": "def456",
    "size": 0,
    "url": "https://api.github.com/repos/{owner}/{repo}/contents/path/to/subdir",
    "html_url": "https://github.com/{owner}/{repo}/tree/main/path/to/subdir",
    "git_url": "https://api.github.com/repos/{owner}/{repo}/git/trees/def456",
    "download_url": null,
    "type": "dir"
  }
]
    """
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

def fetch_all_files(owner: str, repo: str, path: str = '') -> List[Tuple[str, str]]:
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

    skip_dirs = ['node_modules', 'vendor', 'venv', 'env', 'dist', 'build']

    for item in repo_content:
        if item['type'] == 'file' and item['name'].endswith(('.py', '.ipynb', '.js', '.java', '.cpp', '.c', '.html', '.css', '.jsx', '.tsx', 'package.json')):
            file_content = get_file_content(owner, repo, item['path'])
            code_files.append((item['path'], file_content))
        elif item['type'] == 'dir' and item['name'] not in skip_dirs:
            # Recursive call to do the same for the remaining tree
            code_files.extend(fetch_all_files(owner, repo, item['path']))
    
    return code_files


