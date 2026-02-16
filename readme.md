# AI-Powered End-to-End Test Generation with Playwright

This repository demonstrates a complete system that uses Artificial Intelligence to generate, validate, and execute end-to-end browser tests from plain-English user stories.

The system converts product requirements into structured test definitions, validates them for correctness, generates runnable Playwright TypeScript tests, and executes them against a real Next.js web application.

This project shows how AI can be integrated into software testing in a controlled, engineering-driven way.

---

## What This Project Does

1. Reads user stories written in Markdown.
2. Sends them to an AI model through the OpenAI API.
3. Receives structured JSON test specifications.
4. Validates those specs using strict schema validation.
5. Converts validated specs into Playwright `.spec.ts` files.
6. Runs tests across Chromium, Firefox, and WebKit.
7. Produces an HTML report.

---

## Full Architecture

User Stories (Markdown)
        ↓
AI Model (OpenAI API)
        ↓
Structured JSON Test Specs
        ↓
Schema Validation (Pydantic)
        ↓
Playwright Test File Generation
        ↓
Browser Execution (Playwright)
        ↓
HTML Test Report

---

## Repository Structure

ai-test-generator-playwright/
│
├── src/llmtg/              # Python AI test generator
├── sample_inputs/          # Example user stories
├── output_tests/           # Generated Playwright tests
├── demo-app/               # Next.js web application under test
├── playwright_runner/      # Playwright runner project
├── tests/                  # Python unit tests
├── .env.example            # Environment variable template
└── README.md

All components are part of a single integrated system.

---

## Requirements

- Python 3.10+
- Node.js 18+
- npm
- OpenAI API key with billing enabled

---

## Setup Instructions

1) Create Python virtual environment:

python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

2) Create a file named `.env` in the project root:

OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini

3) Install demo app dependencies:

cd demo-app
npm install

4) Install Playwright dependencies:

cd ../playwright_runner
npm install
npx playwright install

---

## Running the System

Start the demo app:

cd demo-app
npm run dev

In a separate terminal, generate tests:

cd ..
source .venv/bin/activate
python -m llmtg.cli

Run Playwright tests:

cd playwright_runner
cp ../output_tests/*.spec.ts ./tests/
npx playwright test

View test report:

npx playwright show-report

---

## Engineering Design Decisions

- Strict schema validation prevents malformed AI output from becoming executable test code.
- Stable selectors (`data-testid`) reduce UI test flakiness.
- Cross-browser execution ensures consistent behavior.
- Low-temperature AI generation improves reproducibility.

---

## Security Practices

- `.env` is ignored via `.gitignore`
- `.env.example` is provided for safe setup
- API keys are never committed

---

## Author

Your Name
GitHub: https://github.com/mmlawre
LinkedIn: for security purposes, hidden and provided upon request. can only be accessed via direct link
