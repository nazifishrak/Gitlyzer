
import os
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
load_dotenv()
GEMINI_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_KEY)







def upload_to_gemini(path, mime_type=None):
  """Uploads the given file to Gemini.

  See https://ai.google.dev/gemini-api/docs/prompting_with_media
  """
  file = genai.upload_file(path, mime_type=mime_type)
  print(f"Uploaded file '{file.display_name}' as: {file.uri}")
  return file


# https://ai.google.dev/api/python/google/generativeai/GenerativeModel
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="I am giving you content of all the files inside a repository. Your job is to analyze the code and tell technically the description of what each file is doing and the tech stack and skillset needed to work on this project. Return as a markdown in human readable format",
)
def format_response_as_markdown(response_dict):
    """Formats the response dictionary as markdown."""
    markdown_response = ""
    for filename, details in response_dict.items():
        markdown_response += f"### {filename}\n"
        markdown_response += f"**Description:** {details['description']}\n\n"
        markdown_response += f"**Tech Stack:** {', '.join(details['tech_stack'])}\n\n"
        markdown_response += f"**Skillset:** {', '.join(details['skillset'])}\n\n"
    return markdown_response
def analyzer(model: genai.GenerativeModel=model, code_content='', question=""):

# TODO Make these files available on the local file system
# You may need to update the file paths


    response = model.generate_content(f"Based on the code contents {code_content} answer this question {question}")
    # print("HERE IS THE RESPONSE*****************************")
    # print(response.text)
    

    return response.text


llm = GoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GEMINI_KEY)



# Analyzer function using langchain
def analyzer_langChain(code_content='', question=""):
    
    system_instruction = f"I am giving you content of all the files inside a repository. Your job is to analyze the code and technically the description of what each file is doing and the tech stack and skillset needed to work on this project. Return as a markdown in human readable format. and answer this {{question}}"
    template = f"""{system_instruction}
    
    Based on the code contents {{code_content}} answer ."""
    prompt = PromptTemplate.from_template(template)
    chain = prompt | llm
    response = chain.invoke({"code_content": code_content, "question": question})
    return response
