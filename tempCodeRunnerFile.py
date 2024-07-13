def upload_to_gemini(path, mime_type=None):
#   """Uploads the given file to Gemini.

#   See https://ai.google.dev/gemini-api/docs/prompting_with_media
#   """
#   file = genai.upload_file(path, mime_type=mime_type)
#   print(f"Uploaded file '{file.display_name}' as: {file.uri}")
#   return file

# # Create the model
# # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
# generation_config = {
#   "temperature": 1,
#   "top_p": 0.95,
#   "top_k": 64,
#   "max_output_tokens": 8192,
#   "response_mime_type": "application/json",
# }

# model = genai.GenerativeModel(
#   model_name="gemini-1.5-flash",
#   generation_config=generation_config,
#   # safety_settings = Adjust safety settings
#   # See https://ai.google.dev/gemini-api/docs/safety-settings
# )

# # TODO Make these files available on the local file system
# # You may need to update the file paths
# files = [
#   upload_to_gemini("image_food4.jpeg", mime_type="image/jpeg"),
# ]

# chat_session = model.start_chat(
#   history=[
#     {
#       "role": "user",
#       "parts": [
#         files[0],
#         "Given this image detail the recipe to bake this item in JSON format. Include item names and quantities for the recipe.",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "{\"recipe\": {\"name\": \"Roasted Potatoes with Chanterelles\", \"ingredients\": [{\"quantity\": \"1\", \"name\": \"pound\", \"unit\": null, \"description\": \"potatoes, peeled and cut into 1-inch chunks\"}, {\"quantity\": \"1/2\", \"name\": \"pound\", \"unit\": null, \"description\": \"chanterelle mushrooms, cleaned\"}, {\"quantity\": \"1/4\", \"name\": \"cup\", \"unit\": null, \"description\": \"olive oil\"}, {\"quantity\": \"1/2\", \"name\": \"teaspoon\", \"unit\": null, \"description\": \"salt\"}, {\"quantity\": \"1/4\", \"name\": \"teaspoon\", \"unit\": null, \"description\": \"black pepper\"}, {\"quantity\": \"2\", \"name\": \"tablespoons\", \"unit\": null, \"description\": \"fresh parsley, chopped\"}, {\"quantity\": \"1\", \"name\": \"tablespoon\", \"unit\": null, \"description\": \"lemon juice\"}], \"instructions\": [{\"step\": \"Preheat oven to 400 degrees F (200 degrees C).\", \"description\": null}, {\"step\": \"In a large bowl, toss potatoes, chanterelles, olive oil, salt, and pepper together.\", \"description\": null}, {\"step\": \"Spread potato mixture in a single layer in a baking dish.\", \"description\": null}, {\"step\": \"Roast in the preheated oven for 30-40 minutes, or until potatoes are tender and golden brown.\", \"description\": null}, {\"step\": \"Stir in parsley and lemon juice, and serve.\", \"description\": null}]}}\n",
#       ],
#     },
#   ]
# )

# response = chat_session.send_message("INSERT_INPUT_HERE")

# print(response.text)