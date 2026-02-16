import json
from openai import OpenAI
from .prompts import SYSTEM, USER_TEMPLATE

class AIClient:
    def __init__(self, api_key: str, model: str, base_url: str | None = None):
        self.client = OpenAI(api_key=api_key, base_url=base_url)
        self.model = model


    def generate_tests(self, artifact: str, context: str) -> list[dict]:
        user = USER_TEMPLATE.format(context=context, artifact=artifact)

        resp = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": user},
            ],
            response_format={"type": "json_object"},
            temperature=0.2,
        )

        text = resp.choices[0].message.content or ""
        data = json.loads(text)

        if "tests" not in data or not isinstance(data["tests"], list):
            raise ValueError("AI output must be JSON object with top-level key 'tests' (a list).")

        return data["tests"]


