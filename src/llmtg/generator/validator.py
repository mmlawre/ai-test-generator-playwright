from pydantic import ValidationError
from llmtg.llm.schema import TestSpec

class SpecValidator:
    def validate(self, specs: list[dict]) -> tuple[list[TestSpec], list[dict]]:
        ok: list[TestSpec] = []
        bad: list[dict] = []
        for s in specs:
            try:
                ok.append(TestSpec.model_validate(s))
            except ValidationError as e:
                bad.append({"spec": s, "error": str(e)})
        return ok, bad
