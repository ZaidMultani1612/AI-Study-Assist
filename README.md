# 🎓 AI Study Assistant

> **Tagline:** *"Learn Smarter • Practice Better • Study with Confidence"*  
> **Methodology:** Vibe Coding (Natural-Language Iterative Development & Engineering)  
> **Tech Stack:** Pure Python (Standard Library) + HTML5 + CSS3 + Vanilla JavaScript (ES6+). Zero external frameworks, zero cloud AI APIs.

---

## 1. Project Description

AI Study Assistant is a web-based educational application designed to help students learn academic subjects through interactive study notes, an AI-style conversational assistant, quick revision materials, short-answer explanations, quizzes, performance tracking and personalized study recommendations.

The application is developed using Python, HTML, CSS and vanilla JavaScript. Vibe Coding is used as the primary development methodology, where natural-language requirements are transformed into application components through iterative AI-assisted development, testing, debugging and refinement.

The application operates locally without external AI APIs or third-party frameworks.

---

## 2. Key Features

- **Dashboard:**
  - Time-aware personalized student greeting (`Good Morning / Afternoon / Evening, Student! 👋`).
  - Global topic search bar with instant query matching.
  - Live statistics: Topics Studied, Quizzes Completed, Average Score, and Study Streak.
  - Popular subject cards for immediate study exploration.
  - "🎯 Recommended for You" widget displaying personalized revision suggestions based on quiz error history.

- **AI Chat Assistant:**
  - Responsive conversational companion powered by an intelligent local keyword and intent-matching engine.
  - Subject-specific filtering (All Subjects, Python, Machine Learning, AI, DBMS, Data Science, Computer Networks).
  - Realistic typing indicator animation (`● ● ●`) with responsive simulated delay.
  - Suggested question chips tailored to subjects.
  - Markdown-style rich formatting for definitions, bullet points, and code blocks.
  - Conversation persistence via `localStorage` and one-click chat clearing.

- **Study Notes:**
  - 96 in-depth academic topics across 6 core technical domains.
  - Each topic contains:
    1. Clear Definition
    2. Key Concepts (Bullet points)
    3. Detailed Explanation
    4. Practical Code or Scenario Example
    5. Real-World Applications
    6. Important Exam Points
    7. Concise Summary
  - Live client-side search filtering by topic title and keywords.
  - Action buttons: "Start Quiz", "Quick Revision", and "Ask Assistant".

- **Quick Revision Mode:**
  - High-yield, concise bullet notes structured for rapid exam cramming.
  - Subject and topic selector with one-click quiz launch.

- **Short Answer Generator:**
  - Generates exam-ready short answers formatted for university marking rubrics.
  - Includes direct definitions, concrete examples, practical applications, and high-yield exam takeaways.
  - Integrated "Copy Answer" clipboard functionality and follow-up prompts.

- **Interactive MCQ Quiz Engine:**
  - 106 verified, non-duplicate multiple choice questions across all 6 subjects:
    - **Python:** 16 questions
    - **Machine Learning:** 21 questions
    - **Artificial Intelligence:** 16 questions
    - **DBMS:** 21 questions
    - **Data Science:** 16 questions
    - **Computer Networks:** 16 questions
  - Configurable subject filter, difficulty level (Easy, Medium, Hard, All), and question count (5, 10, 15).
  - Randomized question pool without in-quiz repetitions.
  - Real-time countdown timer, progress bar, and option selection cards.
  - Motivational score tier badges:
    - 90–100%: *Excellent! 🏆*
    - 75–89%: *Very Good! ⭐*
    - 60–74%: *Good! 👍*
    - 40–59%: *Needs Improvement 📚*
    - Below 40%: *More Revision Recommended 💪*
  - Comprehensive question-by-question review with user answers, correct answers, and educational explanations.

- **Weak-Topic Detection & Recommendations:**
  - Automatically identifies topics answered incorrectly in quizzes.
  - Telemetry stored in `localStorage` powers actionable recommendations with one-click revision shortcuts.

- **Progress Dashboard & Analytics:**
  - Metrics tracking total topics studied, completed quizzes, questions answered, and overall average accuracy.
  - Visual completion progress bars across all 6 subjects.
  - Historical quiz performance log table.

- **Study Streak Tracker:**
  - Tracks continuous study habits across consecutive calendar days without requiring user authentication.

- **Dark / Light Mode:**
  - Complete theme switcher using CSS custom properties with persistent `localStorage` memory.

- **Settings & Data Management:**
  - Custom preference controls for default subjects and quiz difficulties.
  - Granular reset buttons: Clear Chat History, Clear Quiz History, Reset Progress, and Clear All Data (Factory Reset) with confirmation modal dialogs.

---

## 3. Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend & Server** | Python 3 (Standard Library: `http.server`, `json`, `webbrowser`, `pathlib`) | Zero external dependencies; safe local server execution. |
| **Data Layer** | Python (`study_data.py`, `quiz_data.py`) | Structured, modular knowledge base and quiz question repository. |
| **Markup** | HTML5 | Semantic single-page application structure. |
| **Styling** | CSS3 (Variables, Flexbox, Grid, Animations) | Modern, responsive, clean aesthetic; zero Bootstrap/Tailwind. |
| **Client Engine** | Vanilla JavaScript (ES6+) | Single-Page router, chat matching, quiz logic, `localStorage`. |

> **Strict Restrictions Upheld:**  
> Zero Flask, Django, FastAPI, React, Angular, Vue, Bootstrap, Tailwind, Node.js, Express, Firebase, MySQL, MongoDB, OpenAI, Gemini, or Claude cloud APIs.

---

## 4. Project File Structure

```
AI-Study-Assistant/
├── main.py              # Local HTTP server, data bundler & browser launcher
├── study_data.py        # Python knowledge base (6 subjects, 96 topics)
├── quiz_data.py         # Python question bank (106 verified educational MCQs)
├── data.js              # Auto-generated browser bundle of study & quiz data
├── index.html           # Semantic Single Page Application layout
├── style.css            # Responsive design system with dark/light themes
├── script.js            # Core application logic (Router, Chat, Quiz, Storage)
├── implementation_plan.md # Development & architecture plan
└── README.md            # Comprehensive project documentation
```

---

## 5. How to Run the Application

### Option A: Local Python Server (Recommended)

1. Open PowerShell or Terminal in the project directory:
   ```bash
   cd "d:/Zaid/SEM 7/AI-Study-Assistant"
   ```
2. Run the application using Python:
   ```bash
   python main.py
   ```
3. Your default web browser will automatically open:
   ```
   http://localhost:8000
   ```
4. Press `Ctrl + C` in the terminal to stop the server at any time.

### Option B: Direct Browser Execution (Offline / Standalone)

Because `main.py` generates `data.js`, the entire application is 100% self-contained:
- Simply double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
- All study notes, AI chat responses, quizzes, and progress analytics work offline via `localStorage`.

---

## 6. How Vibe Coding Was Implemented

This project was built following the **Vibe Coding** methodology:
1. **Natural-Language Architectural Specification:** The comprehensive master prompt was analyzed to establish requirements across 53 sections.
2. **Modular Data Structuring:** Python knowledge dictionaries (`study_data.py`) and question banks (`quiz_data.py`) were authored and vetted for technical precision.
3. **Iterative Component Development:** HTML5 semantic containers, CSS custom property theming, and modular JavaScript event controllers were built progressively.
4. **Automated Verification & Debugging:**
   - Server endpoints were tested with an automated Python HTTP client script.
   - A DOM integrity check script confirmed that all 93 element IDs called in JavaScript existed in `index.html`.
   - Windows terminal encoding nuances (`UnicodeEncodeError` on cp1252) were identified during testing and resolved by setting UTF-8 stdout reconfiguration.
5. **UI & Accessibility Polish:** Tested responsive layouts across Desktop, Tablet, and Mobile viewport breakpoints.

---

## 7. Testing Checklist & Verification Results

- [x] **Dashboard:** Loads greeting, topic cards, and dynamic statistics from `localStorage`.
- [x] **AI Chat:** Interactive conversation, typing indicator, suggested chips, and keyword fallback responses.
- [x] **Study Notes:** Search filtering, subject tabs, and complete 7-section notes display.
- [x] **Quick Revision:** High-yield cram notes with instant quiz triggers.
- [x] **Short Answer Generator:** Exam-style answers, examples, exam takeaways, and clipboard copy.
- [x] **Quiz Engine:** 106 questions, subject/difficulty filtering, timer, score calculation, weak-topic logging, and question-by-question review.
- [x] **Progress & Streaks:** Subject completion bars, study streaks, and quiz history log.
- [x] **Settings & Theming:** Smooth Light/Dark mode transitions, preference persistence, and safe data wipe modals.
- [x] **Responsive Layout:** Desktop sidebar, tablet compact layout, and mobile drawer menu.
- [x] **Constraint Verification:** 100% pure Python, HTML, CSS, and Vanilla JavaScript with zero external frameworks or APIs.

---

## 8. Screenshots

> *Placeholder: Add screenshots of Dashboard, AI Chat, Study Notes, and Quiz Result here.*

```
+--------------------------------------------------------------------------+
| 🎓 AI Study Assistant                                     ☀️ Light Mode  |
+--------------------------------------------------------------------------+
| 🏠 Dashboard    |  Good Morning, Student! 👋                             |
| 🤖 AI Assistant |  What would you like to learn today?                   |
| 📚 Study Notes  |  [ Search a topic to start learning... ] [Start]      |
| 🔄 Revision     |                                                        |
| ❓ Quiz         |  [12 Topics Studied] [8 Quizzes] [82% Avg] [5 Streak]  |
| 📝 Short Answer |                                                        |
| 📊 Progress     |  Popular Subjects:                                     |
| ⚙️ Settings     |  [Python] [Machine Learning] [AI] [DBMS] [Data Science]|
+--------------------------------------------------------------------------+
```

---

## 9. Future Improvements

As defined in the project roadmap (for future exploration with proper infrastructure):
- Integration with local open-weight Large Language Models (e.g. Ollama/Llama 3).
- Speech-to-text and voice-based question answering.
- PDF lecture notes upload and summarization.
- Multi-user authentication and cloud synchronization.
- Personalized spaced-repetition flashcards (Anki-style).
- Multilingual translation support.

---

## 10. License & Credits

Built with Python, HTML5, CSS3, Vanilla JavaScript, and Vibe Coding.  
© 2026 AI Study Assistant • All educational rights reserved.
