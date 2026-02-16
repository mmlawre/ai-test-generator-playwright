from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class Step(BaseModel):
    action: Literal["goto", "click", "fill", "assert_text"]
    selector: Optional[str] = None
    value: Optional[str] = None
    assert_text: Optional[str] = None

class TestSpec(BaseModel):
    id: str = Field(..., description="Stable test ID like login_valid")
    title: str
    type: Literal["ui"]
    steps: List[Step]
    tags: List[str] = []
