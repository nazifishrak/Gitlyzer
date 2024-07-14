# GitHub Code Analyzer

## Overview

Gitlyzer is an application designed to scan a GitHub repository and provide a detailed analysis of its contents. It can tell what the repository is about, what it does, and the tech stacks used. This project leverages both frontend and backend technologies, utilizing Google's Gemini API for code analysis.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Skillset Required](#skillset-required)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Branch Naming Conventions](#branch-naming-conventions)
- [License](#license)

## Features

- Scans GitHub repositories to analyze their contents.
- Provides a summary of what the repository does.
- Identifies the tech stack used in the repository.
- User-friendly interface for entering repository details.
- Displays analysis results in a markdown format.

## Tech Stack

### Backend

- Python
- Flask


### Frontend

- Next.js
- Tailwind CSS


## Skillset Required

### Backend

- Python programming
- API integration
- Flask framework
- REST APIs and HTTP requests
- JSON data format
- OAuth authentication
- Data encoding/decoding

### Frontend

- React programming
- Next.js framework
- CSS and Tailwind CSS
- Component-based UI development
- Markdown and syntax highlighting libraries
- UI/UX design principles

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:nazifishrak/Gitlyzer.git
   cd repo-name
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following content:

```
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
```

## Usage

1. Run the backend server:
   ```bash
   cd backend
   flask run
   ```

2. Run the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

We welcome contributions to this project. Please follow our guidelines to ensure a smooth contribution process.

### Contribution Guidelines

1. Fork the repository.
2. Create a new branch using the proper naming conventions (see below).
3. Make your changes and commit them with clear and concise messages.
4. Push to your branch.
5. Create a pull request (PR).

### Branch Naming Conventions

- Use descriptive names for your branches.
- Prefix the branch name with the type of work being done. Examples:
  - `feature/short-description` for new features.
  - `bugfix/short-description` for bug fixes.
  - `enhancement/short-description` for improvements.
  - `docs/short-description` for documentation changes.

### Pull Request Guidelines

- Ensure your PR includes a proper description of the changes made.
- Link any relevant issues in the PR description using the format `Fixes #issue_number`.
- Make sure your PR passes all tests and checks.
- Provide a clear and concise title for your PR.
- PRs without proper descriptions and issue linking will not be considered.
