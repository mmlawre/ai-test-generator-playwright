import json
from pathlib import Path
from llmtg.config import settings
from llmtg.llm.client import AIClient
from llmtg.generator.validator import SpecValidator
from llmtg.generator.playwright_writer import write_playwright_ts

def main() -> int:
    if not settings.openai_api_key:
        print("ERROR: Missing OPENAI_API_KEY in .env")
        return 2

    artifact = Path("sample_inputs/user_stories.md").read_text(encoding="utf-8")

    # Context = the ONLY pages and selectors the AI is allowed to use.
    context = """
Base URL: http://localhost:3000

Allowed routes:
- /login
- /dashboard
- /settings

Allowed selectors (data-testid attributes):
- [data-testid="username"]
- [data-testid="password"]
- [data-testid="login-btn"]
- [data-testid="error-banner"]
- [data-testid="welcome"]
- [data-testid="display-name"]
- [data-testid="save-btn"]
- [data-testid="toast"]
- [data-testid="validation"]
"""

    ai = AIClient(settings.openai_api_key, settings.openai_model, settings.openai_base_url)
    raw_specs = ai.generate_tests(artifact=artifact, context=context)

    ok, bad = SpecValidator().validate(raw_specs)

    Path("output_tests").mkdir(exist_ok=True)

    for spec in ok:
        code = write_playwright_ts(spec)
        Path(f"output_tests/{spec.id}.spec.ts").write_text(code, encoding="utf-8")

    Path("output_tests/_bad_specs.json").write_text(json.dumps(bad, indent=2), encoding="utf-8")

    print("DONE")
    print(f"Generated from AI: {len(raw_specs)}")
    print(f"Valid specs:       {len(ok)}")
    print(f"Invalid specs:     {len(bad)} (see output_tests/_bad_specs.json)")
    print("Playwright tests written to output_tests/")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
