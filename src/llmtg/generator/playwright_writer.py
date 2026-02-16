from llmtg.llm.schema import TestSpec

def _escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')

def write_playwright_ts(spec: TestSpec) -> str:
    lines: list[str] = []
    lines.append('import { test, expect } from "@playwright/test";')
    lines.append("")
    lines.append(f'test("{_escape(spec.title)}", async ({ "{ page }" }) => ' + "{")

    for step in spec.steps:
        if step.action == "goto":
            lines.append(f'  await page.goto("{_escape(step.value or "")}");')
        elif step.action == "click":
            lines.append(f'  await page.locator("{_escape(step.selector or "")}").click();')
        elif step.action == "fill":
            lines.append(f'  await page.locator("{_escape(step.selector or "")}").fill("{_escape(step.value or "")}");')
        elif step.action == "assert_text":
            lines.append(
                '  await expect(page.locator("'
                + _escape(step.selector or "")
                + '")).toContainText("'
                + _escape(step.assert_text or "")
                + '");'
            )

    lines.append("});")
    return "\n".join(lines)
