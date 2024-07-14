import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

# Load the environment variables
load_dotenv()
GEMINI_KEY = os.getenv('GEMINI_API_KEY')


llm = GoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GEMINI_KEY)



# Analyzer function using langchain
def analyzer_langChain(code_content='', question=""):
    system_instruction = "I am giving you content of all the files inside a repository. Your job is to analyze the code and tell technically the description of what each file is doing and the tech stack and skillset needed to work on this project. Return as a markdown in human readable format."
    template = f"""{system_instruction}
    
    Based on the code contents {{code_content}} answer this question {{question}}."""
    prompt = PromptTemplate.from_template(template)
    chain = prompt | llm
    response = chain.invoke({"code_content": code_content, "question": question})
    return response


