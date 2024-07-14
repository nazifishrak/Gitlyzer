import os
import openai

def get_api_key():
    """Prompt the user to enter their API key."""
    return input("Please enter your API key: ")

def get_user_input():
    """Prompt the user to enter the input for the LLM call."""
    return input("Please enter your input for the LLM: ")

def save_api_key(api_key, filename='api_key.txt'):
    """Save the API key to a file."""
    with open(filename, 'w') as f:
        f.write(api_key)

def load_api_key(filename='api_key.txt'):
    """Load the API key from a file."""
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return f.read().strip()
    else:
        return None

def call_llm(api_key, user_input):
    """Make a call to the LLM with the provided API key and user input."""
    openai.api_key = api_key
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_input,
        max_tokens=150
    )
    return response.choices[0].text

def main():
    api_key = load_api_key()
    if not api_key:
        api_key = get_api_key()
        save_api_key(api_key)
    
    user_input = get_user_input()
    response = call_llm(api_key, user_input)
    print("LLM Response:")
    print(response)

if __name__ == '__main__':
    main()
