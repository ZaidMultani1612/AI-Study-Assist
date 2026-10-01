#!/usr/bin/env python3
"""
AI Study Assistant - Local Application Runner & Server
Strictly standard library Python: http.server, webbrowser, json, pathlib, socketserver.
Zero external frameworks, zero external dependencies.
"""

import sys
import os
import json
import webbrowser
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

# Reconfigure stdout/stderr to UTF-8 on Windows if supported
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Load knowledge base and quiz banks
import study_data
import quiz_data

PORT = 8000
DIRECTORY = Path(__file__).resolve().parent

def export_data_bundle():
    """
    Serializes Python study data and quiz data into a browser-loadable data.js file.
    This guarantees that the web app functions seamlessly both when served over HTTP
    and when opened directly as a local file, maintaining 100% standalone reliability.
    """
    js_content = (
        "// AI Study Assistant - Auto-generated Local Knowledge Base & Quiz Data\n"
        "// Generated from study_data.py and quiz_data.py\n\n"
        f"const STUDY_DATA = {json.dumps(study_data.STUDY_DATA, indent=2)};\n\n"
        f"const QUIZ_DATA = {json.dumps(quiz_data.QUIZ_DATA, indent=2)};\n"
    )
    data_file = DIRECTORY / "data.js"
    with open(data_file, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"[OK] Successfully exported data bundle to {data_file.name}")

class StudyAssistantHandler(SimpleHTTPRequestHandler):
    """
    Custom HTTP request handler serving static files with appropriate cache controls.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        # Prevent caching during development so updates appear immediately
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean custom server logging
        sys.stdout.write(f"[Server Log] {self.address_string()} - {format % args}\n")

def run_server():
    """
    Initializes and launches the local Python HTTP server and opens the browser.
    """
    os.chdir(DIRECTORY)
    export_data_bundle()

    subject_count = len(study_data.STUDY_DATA)
    topic_count = sum(len(sub["topics"]) for sub in study_data.STUDY_DATA.values())
    question_count = len(quiz_data.QUIZ_DATA)

    banner = f"""
========================================================================
  AI STUDY ASSISTANT - VIBE CODING EDITION
  "Learn Smarter - Practice Better - Study with Confidence"
========================================================================
[OK] Core Technologies: Pure Python + HTML5 + CSS3 + Vanilla JavaScript
[OK] Frameworks Used  : NONE (Zero Flask, Django, React, or cloud AI APIs)
[OK] Subjects Loaded  : {subject_count} Core Computer Science & IT Subjects
[OK] Study Topics     : {topic_count} In-depth Topics with Summaries & Examples
[OK] Quiz Question Bank: {question_count} Verified Educational MCQs
[OK] Application URL  : http://localhost:{PORT}
========================================================================
[i] Launching browser automatically... Press Ctrl+C in terminal to stop.
========================================================================
"""
    print(banner)

    try:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), StudyAssistantHandler)
    except OSError as e:
        print(f"[!] Port {PORT} is busy or unavailable ({e}). Retrying on port 8080...")
        server = ThreadingHTTPServer(("127.0.0.1", 8080), StudyAssistantHandler)

    url = f"http://localhost:{server.server_port}"
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"[!] Could not open browser automatically: {e}")
        print(f"[i] Please navigate manually to: {url}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[OK] Shutting down AI Study Assistant server gracefully. Goodbye!")
        server.shutdown()
        server.server_close()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--export-only":
        export_data_bundle()
    else:
        run_server()
