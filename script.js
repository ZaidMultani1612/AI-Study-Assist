/**
 * AI Study Assistant - Core Application Engine
 * Pure Vanilla JavaScript (ES6+). Zero external frameworks, zero dependencies.
 * Handles Routing, Chat Matching, Study Notes Explorer, Quiz Engine,
 * Progress Analytics, Recommendations, Streak Tracking, and LocalStorage.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. STATE & STORAGE MANAGEMENT
  // =========================================================================
  const STORAGE_KEYS = {
    THEME: 'ai_study_theme',
    STUDIED_TOPICS: 'ai_study_studied_topics',
    QUIZ_HISTORY: 'ai_study_quiz_history',
    WEAK_TOPICS: 'ai_study_weak_topics',
    CHAT_HISTORY: 'ai_study_chat_history',
    LAST_STUDY_DATE: 'ai_study_last_date',
    STUDY_STREAK: 'ai_study_streak',
    PREF_SUBJECT: 'ai_study_pref_subject',
    PREF_DIFFICULTY: 'ai_study_pref_difficulty',
  };

  const AppState = {
    currentSection: 'dashboard',
    theme: 'light',
    studiedTopics: new Set(),
    quizHistory: [],
    weakTopics: {}, // topic_id -> count of incorrect attempts
    chatHistory: [],
    studyStreak: 1,
    lastStudyDate: null,
    preferences: {
      defaultSubject: 'machine_learning',
      defaultDifficulty: 'all',
    },
    // Active quiz session state
    quiz: {
      active: false,
      questions: [],
      currentIndex: 0,
      userAnswers: {}, // questionIndex -> selectedOptionIndex
      timerSeconds: 0,
      timerInterval: null,
      subject: 'all',
      difficulty: 'all',
    },
    // Active selected topic for notes
    activeTopicId: null,
  };

  const MONOGRAMS = {
    python: 'PY',
    machine_learning: 'ML',
    artificial_intelligence: 'AI',
    dbms: 'DB',
    data_science: 'DS',
    computer_networks: 'CN'
  };

  // Safe localStorage helper
  const Storage = {
    get(key, fallback = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.warn(`[Storage] Failed to read ${key}:`, e);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn(`[Storage] Failed to save ${key}:`, e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn(`[Storage] Failed to remove ${key}:`, e);
      }
    },
    clearAll() {
      try {
        localStorage.clear();
      } catch (e) {
        console.warn('[Storage] Failed to clear localStorage:', e);
      }
    }
  };

  // =========================================================================
  // 2. INITIALIZATION & STATE HYDRATION
  // =========================================================================
  function initApp() {
    hydrateState();
    updateStudyStreak();
    setupNavigation();
    setupTheme();
    renderDashboard();
    setupChatAssistant();
    setupStudyNotes();
    setupQuickRevision();
    setupShortAnswer();
    setupQuizEngine();
    renderProgressSection();
    setupSettings();
    setupMobileMenu();
  }

  function hydrateState() {
    AppState.theme = Storage.get(STORAGE_KEYS.THEME, 'light');
    applyTheme(AppState.theme);

    const savedStudied = Storage.get(STORAGE_KEYS.STUDIED_TOPICS, []);
    AppState.studiedTopics = new Set(savedStudied);

    AppState.quizHistory = Storage.get(STORAGE_KEYS.QUIZ_HISTORY, []);
    AppState.weakTopics = Storage.get(STORAGE_KEYS.WEAK_TOPICS, {});
    AppState.chatHistory = Storage.get(STORAGE_KEYS.CHAT_HISTORY, []);

    AppState.preferences.defaultSubject = Storage.get(STORAGE_KEYS.PREF_SUBJECT, 'machine_learning');
    AppState.preferences.defaultDifficulty = Storage.get(STORAGE_KEYS.PREF_DIFFICULTY, 'all');

    const prefSubSelect = document.getElementById('pref-default-subject');
    const prefDiffSelect = document.getElementById('pref-default-difficulty');
    if (prefSubSelect) prefSubSelect.value = AppState.preferences.defaultSubject;
    if (prefDiffSelect) prefDiffSelect.value = AppState.preferences.defaultDifficulty;
  }

  function updateStudyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = Storage.get(STORAGE_KEYS.LAST_STUDY_DATE, null);
    let streak = Storage.get(STORAGE_KEYS.STUDY_STREAK, 1);

    if (!lastDate) {
      streak = 1;
    } else if (lastDate === today) {
      // Already recorded today
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (lastDate === yesterday) {
        streak += 1;
      } else {
        streak = 1;
      }
    }

    AppState.studyStreak = streak;
    AppState.lastStudyDate = today;

    Storage.set(STORAGE_KEYS.LAST_STUDY_DATE, today);
    Storage.set(STORAGE_KEYS.STUDY_STREAK, streak);

    const streakSidebar = document.getElementById('sidebar-streak-count');
    const streakDash = document.getElementById('stat-study-streak');
    const streakLabel = `${streak} ${streak === 1 ? 'Day' : 'Days'}`;
    if (streakSidebar) streakSidebar.textContent = streakLabel;
    if (streakDash) streakDash.textContent = streakLabel;
  }

  // =========================================================================
  // 3. NAVIGATION & ROUTING
  // =========================================================================
  function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSection = btn.dataset.section;
        navigateTo(targetSection);
        closeMobileMenu();
      });
    });

    const bannerStart = document.getElementById('banner-start-learning');
    const bannerExplore = document.getElementById('banner-explore-subjects');
    if (bannerStart) {
      bannerStart.addEventListener('click', () => navigateTo('notes'));
    }
    if (bannerExplore) {
      bannerExplore.addEventListener('click', () => {
        const el = document.getElementById('dashboard-subject-cards');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function navigateTo(sectionId) {
    if (!sectionId) return;

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    document.querySelectorAll('.content-section').forEach(sec => {
      const isTarget = sec.id === `section-${sectionId}`;
      sec.classList.toggle('active', isTarget);
      if (isTarget) sec.classList.remove('hidden');
    });

    AppState.currentSection = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId === 'dashboard') {
      renderDashboardStats();
      renderDashboardRecommendations();
    } else if (sectionId === 'progress') {
      renderProgressSection();
    } else if (sectionId === 'notes' && !AppState.activeTopicId) {
      selectFirstTopicInNotes();
    }
  }

  function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && overlay) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });

      overlay.addEventListener('click', closeMobileMenu);
    }
  }

  function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  // =========================================================================
  // 4. THEME CONTROLLER
  // =========================================================================
  function setupTheme() {
    const toggleSidebar = document.getElementById('theme-toggle');
    const toggleMobile = document.getElementById('theme-toggle-mobile');
    const btnLight = document.getElementById('btn-theme-light');
    const btnDark = document.getElementById('btn-theme-dark');

    const toggleTheme = () => {
      const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    };

    if (toggleSidebar) toggleSidebar.addEventListener('click', toggleTheme);
    if (toggleMobile) toggleMobile.addEventListener('click', toggleTheme);

    if (btnLight) {
      btnLight.addEventListener('click', () => applyTheme('light'));
    }
    if (btnDark) {
      btnDark.addEventListener('click', () => applyTheme('dark'));
    }
  }

  function applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    Storage.set(STORAGE_KEYS.THEME, theme);

    const sunSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    const themeIcon = document.getElementById('theme-icon');
    const themeLabel = document.getElementById('theme-label');
    const mobileThemeBtn = document.getElementById('theme-toggle-mobile');

    if (themeIcon) themeIcon.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
    if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    if (mobileThemeBtn) mobileThemeBtn.innerHTML = theme === 'dark' ? sunSvg : moonSvg;

    const btnLight = document.getElementById('btn-theme-light');
    const btnDark = document.getElementById('btn-theme-dark');
    if (btnLight) btnLight.classList.toggle('active', theme === 'light');
    if (btnDark) btnDark.classList.toggle('active', theme === 'dark');
  }

  // =========================================================================
  // 5. DASHBOARD VIEW CONTROLLER
  // =========================================================================
  function renderDashboard() {
    renderGreeting();
    renderDashboardStats();
    renderDashboardSubjectCards();
    renderDashboardRecommendations();
    setupDashboardSearch();
  }

  function renderGreeting() {
    const greetingEl = document.getElementById('greeting-text');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good afternoon';
    } else if (hour >= 17) {
      timeGreeting = 'Good evening';
    }
    greetingEl.textContent = `${timeGreeting}, Student`;
  }

  function renderDashboardStats() {
    const studiedEl = document.getElementById('stat-topics-studied');
    const quizzesEl = document.getElementById('stat-quizzes-completed');
    const avgScoreEl = document.getElementById('stat-average-score');

    if (studiedEl) studiedEl.textContent = AppState.studiedTopics.size;

    const completedQuizzes = AppState.quizHistory.length;
    if (quizzesEl) quizzesEl.textContent = completedQuizzes;

    if (avgScoreEl) {
      if (completedQuizzes === 0) {
        avgScoreEl.textContent = '0%';
      } else {
        const totalPct = AppState.quizHistory.reduce((sum, q) => sum + q.percentage, 0);
        const avg = Math.round(totalPct / completedQuizzes);
        avgScoreEl.textContent = `${avg}%`;
      }
    }
  }

  function renderDashboardSubjectCards() {
    const container = document.getElementById('dashboard-subject-cards');
    if (!container || typeof STUDY_DATA === 'undefined') return;

    container.innerHTML = '';
    Object.entries(STUDY_DATA).forEach(([subjectKey, subject]) => {
      const mono = MONOGRAMS[subjectKey] || 'SC';
      const card = document.createElement('div');
      card.className = 'subject-card';
      card.innerHTML = `
        <div class="subject-header">
          <div class="subject-monogram-box">${mono}</div>
          <h3 class="subject-title">${subject.name}</h3>
        </div>
        <p class="subject-desc">${subject.description}</p>
        <div class="subject-footer">
          <span>${subject.topics.length} Curriculum Topics</span>
          <span class="explore-link">Access Syllabus &rarr;</span>
        </div>
      `;
      card.addEventListener('click', () => {
        openSubjectInNotes(subjectKey);
      });
      container.appendChild(card);
    });
  }

  function renderDashboardRecommendations() {
    const container = document.getElementById('recommendations-list');
    if (!container) return;

    const recommendations = generateRecommendations();
    container.innerHTML = '';

    recommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'rec-card';
      card.innerHTML = `
        <div>
          <div class="rec-header">
            <span class="rec-tag">${rec.tag}</span>
          </div>
          <p class="rec-text">${rec.text}</p>
        </div>
        <div class="rec-actions">
          <button class="btn btn-sm btn-outline btn-rec-review">Review Notes</button>
          <button class="btn btn-sm btn-primary btn-rec-quiz">Practice</button>
        </div>
      `;

      card.querySelector('.btn-rec-review').addEventListener('click', () => {
        openTopicById(rec.topicId);
      });

      card.querySelector('.btn-rec-quiz').addEventListener('click', () => {
        startQuizWithConfig(rec.subject, 'all', 10);
      });

      container.appendChild(card);
    });
  }

  function generateRecommendations() {
    const recs = [];
    const weakEntries = Object.entries(AppState.weakTopics)
      .sort((a, b) => b[1] - a[1]);

    for (const [topicId, errCount] of weakEntries.slice(0, 3)) {
      const topicObj = findTopicById(topicId);
      if (topicObj) {
        recs.push({
          topicId: topicObj.id,
          subject: topicObj.subject,
          tag: 'Recommended Review',
          text: `Your recent evaluations indicate that ${topicObj.title} requires additional review.`
        });
      }
    }

    const defaultSuggestions = [
      { id: 'ml-decision-tree', subject: 'Machine Learning', tag: 'Core Concept', text: 'Master Decision Tree splitting criteria, entropy, and pruning.' },
      { id: 'dbms-normalization', subject: 'DBMS', tag: 'High Yield', text: 'Examine 1NF, 2NF, 3NF, and BCNF relational normalization.' },
      { id: 'cn-osi-model', subject: 'Computer Networks', tag: 'Fundamental', text: 'Review 7-Layer OSI Model architecture and packet encapsulation.' },
      { id: 'py-exceptions', subject: 'Python', tag: 'Practice', text: 'Master exception handling structures with try-except-finally blocks.' }
    ];

    while (recs.length < 3 && defaultSuggestions.length > 0) {
      const item = defaultSuggestions.shift();
      if (!recs.some(r => r.topicId === item.id)) {
        recs.push({
          topicId: item.id,
          subject: item.subject,
          tag: item.tag,
          text: item.text
        });
      }
    }

    return recs;
  }

  function setupDashboardSearch() {
    const input = document.getElementById('dashboard-search-input');
    const btn = document.getElementById('dashboard-search-btn');
    const dropdown = document.getElementById('search-suggestions');

    if (!input || !btn || !dropdown) return;

    const handleSearch = () => {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        showToast('Please enter a topic to search.');
        return;
      }

      const match = findClosestTopic(query);
      if (match) {
        dropdown.classList.add('hidden');
        input.value = '';
        openTopicById(match.id);
      } else {
        showToast('No matching topic found. Try another search term.');
      }
    };

    btn.addEventListener('click', handleSearch);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch();
    });

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.classList.add('hidden');
        return;
      }

      const matches = searchAllTopics(query).slice(0, 5);
      if (matches.length === 0) {
        dropdown.innerHTML = '<div class="search-suggestion-item"><span class="item-title">No matching topics found</span></div>';
        dropdown.classList.remove('hidden');
        return;
      }

      dropdown.innerHTML = '';
      matches.forEach(topic => {
        const item = document.createElement('div');
        item.className = 'search-suggestion-item';
        item.innerHTML = `
          <span class="item-title">${topic.title}</span>
          <span class="item-sub">${topic.subject}</span>
        `;
        item.addEventListener('click', () => {
          dropdown.classList.add('hidden');
          input.value = '';
          openTopicById(topic.id);
        });
        dropdown.appendChild(item);
      });
      dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dashboard-search-card')) {
        dropdown.classList.add('hidden');
      }
    });
  }

  // =========================================================================
  // 6. AI CHAT ASSISTANT
  // =========================================================================
  function setupChatAssistant() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const clearBtn = document.getElementById('clear-chat-btn');
    const subjectFilter = document.getElementById('chat-subject-filter');

    if (!chatForm || !chatInput) return;

    renderChatMessages();
    renderSuggestedChips();

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendUserChatMessage();
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendUserChatMessage();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        showConfirmModal(
          'Clear Conversation',
          'Are you sure you want to clear your current conversation history?',
          () => {
            AppState.chatHistory = [];
            Storage.set(STORAGE_KEYS.CHAT_HISTORY, []);
            renderChatMessages();
            showToast('Conversation cleared.');
          }
        );
      });
    }

    if (subjectFilter) {
      subjectFilter.addEventListener('change', () => {
        renderSuggestedChips();
      });
    }
  }

  function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    container.innerHTML = '';

    if (AppState.chatHistory.length === 0) {
      const welcomeMsg = {
        role: 'assistant',
        content: `Welcome to **AI Study Assistant**.\n\nYou can query academic concepts across **Machine Learning**, **Python**, **DBMS**, **Artificial Intelligence**, **Data Science**, and **Computer Networks**.\n\nSelect a suggested question above or enter your inquiry below.`,
        timestamp: formatCurrentTime()
      };
      AppState.chatHistory.push(welcomeMsg);
    }

    AppState.chatHistory.forEach(msg => {
      appendChatMessageToDOM(msg.role, msg.content, msg.timestamp, false);
    });

    scrollToLatestMessage();
  }

  function renderSuggestedChips() {
    const container = document.getElementById('chat-suggested-chips');
    const subjectFilter = document.getElementById('chat-subject-filter');
    if (!container) return;

    const selectedSubject = subjectFilter ? subjectFilter.value : 'all';
    const suggestions = getSubjectChatSuggestions(selectedSubject);

    container.innerHTML = '';
    suggestions.forEach(query => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'suggested-chip';
      chip.textContent = query;
      chip.addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        if (input) {
          input.value = query;
          sendUserChatMessage();
        }
      });
      container.appendChild(chip);
    });
  }

  function getSubjectChatSuggestions(subjectKey) {
    const map = {
      machine_learning: [
        'What is Machine Learning?',
        'What are the types of Machine Learning?',
        'Explain supervised learning.',
        'Explain Decision Tree.',
        'What is overfitting?'
      ],
      python: [
        'What is Python?',
        'Explain lists and tuples.',
        'What are Python data types?',
        'Explain exception handling in Python.',
        'What is OOP?'
      ],
      artificial_intelligence: [
        'What is Artificial Intelligence?',
        'Explain BFS and DFS search.',
        'What is the Turing Test?',
        'Explain A* search algorithm.',
        'What is an Intelligent Agent?'
      ],
      dbms: [
        'What is DBMS?',
        'What is a primary key?',
        'What is a foreign key?',
        'Explain 1NF, 2NF and 3NF normalization.',
        'What are SQL joins?'
      ],
      data_science: [
        'What is Data Science?',
        'Explain mean, median, and mode.',
        'What is Exploratory Data Analysis (EDA)?',
        'Explain Standard Deviation.',
        'What is data preprocessing?'
      ],
      computer_networks: [
        'What is the OSI model?',
        'Explain TCP vs UDP.',
        'What is an IP address?',
        'How does DNS work?',
        'Explain network topologies.'
      ]
    };

    if (subjectKey !== 'all' && map[subjectKey]) {
      return map[subjectKey];
    }

    return [
      'What is Machine Learning?',
      'What are the types of ML?',
      'Explain Decision Tree.',
      'What is normalization in DBMS?',
      'Explain TCP vs UDP.'
    ];
  }

  function sendUserChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const time = formatCurrentTime();

    const userMsg = { role: 'user', content: text, timestamp: time };
    AppState.chatHistory.push(userMsg);
    appendChatMessageToDOM('user', text, time, true);
    input.value = '';
    scrollToLatestMessage();

    showTypingIndicator();

    const delay = Math.floor(Math.random() * 250) + 400;
    setTimeout(() => {
      removeTypingIndicator();
      const assistantReply = generateChatResponse(text);
      const assistantMsg = {
        role: 'assistant',
        content: assistantReply,
        timestamp: formatCurrentTime()
      };
      AppState.chatHistory.push(assistantMsg);
      Storage.set(STORAGE_KEYS.CHAT_HISTORY, AppState.chatHistory);
      appendChatMessageToDOM('assistant', assistantReply, assistantMsg.timestamp, true);
      scrollToLatestMessage();
    }, delay);
  }

  function appendChatMessageToDOM(role, content, timestamp, animate = true) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${role}-message`;
    if (!animate) msgEl.style.animation = 'none';

    const avatarText = role === 'user' ? 'YOU' : 'AI';
    const formattedHtml = parseMarkdownToHTML(content);

    msgEl.innerHTML = `
      <div class="msg-avatar ${role}">${avatarText}</div>
      <div class="msg-bubble">
        <div class="msg-content">${formattedHtml}</div>
        <span class="msg-timestamp">${timestamp}</span>
      </div>
    `;

    container.appendChild(msgEl);
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const indicator = document.createElement('div');
    indicator.id = 'chat-typing-indicator';
    indicator.className = 'chat-message assistant-message';
    indicator.innerHTML = `
      <div class="msg-avatar assistant">AI</div>
      <div class="typing-indicator">
        <span class="typing-text">Assistant is preparing response...</span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    container.appendChild(indicator);
    scrollToLatestMessage();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  function scrollToLatestMessage() {
    const container = document.getElementById('chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  function generateChatResponse(userInput) {
    const raw = userInput.toLowerCase().trim();
    const clean = raw.replace(/[?!.,;:'"()]/g, ' ');

    if (clean === 'hi' || clean === 'hello' || clean === 'hey' || clean.startsWith('hello ') || clean.startsWith('hi ')) {
      return "Hello. What academic topic would you like to explore today? You can request concept explanations, code examples, or exam takeaways.";
    }

    if (clean.includes('types of machine learning') || clean.includes('types of ml') || (clean.includes('types') && clean.includes('learning'))) {
      return `### Types of Machine Learning\n\nMachine Learning is categorized into three primary paradigms:\n\n1. **Supervised Learning**: The algorithm learns a mapping function from labeled feature-target pairs $(X, y)$. Subdivided into:\n   - **Classification** (predicting discrete classes, e.g. spam detection)\n   - **Regression** (predicting continuous numerical quantities, e.g. price forecasting)\n\n2. **Unsupervised Learning**: The model processes unlabeled feature data $X$ to discover latent patterns, density distributions, and groupings (e.g. **k-Means Clustering**, **PCA**).\n\n3. **Reinforcement Learning**: An agent interacts with an environment, learning an optimal policy via trial and error to maximize cumulative rewards (e.g. **Q-Learning**, robotics control).\n\n*You can practice these concepts directly in the **Quiz** module or view concise cram points under **Quick Revision**.*`;
    }

    const matchedTopic = findClosestTopic(clean);

    if (matchedTopic) {
      markTopicStudied(matchedTopic.id);

      if (clean.includes('example') || clean.includes('code')) {
        return `### ${matchedTopic.title} – Practical Example\n\n**Definition:** ${matchedTopic.definition}\n\n**Implementation / Example:**\n\`\`\`\n${matchedTopic.example}\n\`\`\`\n\n**Applications:**\n${matchedTopic.applications.map(a => `- ${a}`).join('\n')}`;
      }

      if (clean.includes('exam') || clean.includes('important')) {
        return `### ${matchedTopic.title} – Exam Takeaways\n\n**Definition:** ${matchedTopic.definition}\n\n**Key Takeaways:**\n${matchedTopic.important_points.map(p => `- ${p}`).join('\n')}\n\n**Summary:** ${matchedTopic.summary}`;
      }

      return `### ${matchedTopic.title}\n\n${matchedTopic.definition}\n\n**Key Concepts:**\n${matchedTopic.key_concepts.map(k => `- ${k}`).join('\n')}\n\n**Explanation:**\n${matchedTopic.explanation}\n\n**Exam Takeaway:**\n${matchedTopic.short_answer.exam_point}`;
    }

    return `This topic is not yet indexed in the local knowledge base. You can explore standard curriculum topics in **Machine Learning**, **Python**, **DBMS**, **Artificial Intelligence**, **Data Science**, or **Computer Networks**.\n\n*Recommended inquiries:*\n- "What is Machine Learning?"\n- "Explain Decision Tree."\n- "What is a Primary Key in DBMS?"\n- "Explain supervised vs unsupervised learning."\n- "What is the OSI model?"`;
  }

  // =========================================================================
  // 7. STUDY NOTES EXPLORER
  // =========================================================================
  function setupStudyNotes() {
    const searchInput = document.getElementById('notes-search-input');
    const filterPills = document.querySelectorAll('#notes-subject-filters .filter-pill');

    renderTopicList();

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderTopicList();
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderTopicList();
      });
    });

    const btnQuiz = document.getElementById('btn-note-start-quiz');
    const btnRev = document.getElementById('btn-note-quick-rev');
    const btnAsk = document.getElementById('btn-note-ask-assistant');

    if (btnQuiz) {
      btnQuiz.addEventListener('click', () => {
        if (!AppState.activeTopicId) return;
        const topic = findTopicById(AppState.activeTopicId);
        if (topic) startQuizWithConfig(topic.subject, 'all', 10);
      });
    }

    if (btnRev) {
      btnRev.addEventListener('click', () => {
        if (!AppState.activeTopicId) return;
        openTopicInRevision(AppState.activeTopicId);
      });
    }

    if (btnAsk) {
      btnAsk.addEventListener('click', () => {
        if (!AppState.activeTopicId) return;
        const topic = findTopicById(AppState.activeTopicId);
        if (topic) {
          navigateTo('chat');
          const input = document.getElementById('chat-input');
          if (input) {
            input.value = `Explain ${topic.title}`;
            sendUserChatMessage();
          }
        }
      });
    }
  }

  function renderTopicList() {
    const container = document.getElementById('notes-topic-items');
    const countLabel = document.getElementById('notes-count-label');
    const searchInput = document.getElementById('notes-search-input');
    const activePill = document.querySelector('#notes-subject-filters .filter-pill.active');

    if (!container || typeof STUDY_DATA === 'undefined') return;

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const subjectFilter = activePill ? activePill.dataset.subject : 'all';

    let topics = [];
    Object.entries(STUDY_DATA).forEach(([subKey, sub]) => {
      if (subjectFilter === 'all' || subjectFilter === subKey) {
        topics.push(...sub.topics);
      }
    });

    if (query) {
      topics = topics.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query) ||
        t.keywords.some(k => k.toLowerCase().includes(query))
      );
    }

    if (countLabel) {
      countLabel.textContent = `Showing ${topics.length} ${topics.length === 1 ? 'topic' : 'topics'}`;
    }

    container.innerHTML = '';
    if (topics.length === 0) {
      container.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No matching topics found.</div>`;
      return;
    }

    topics.forEach(topic => {
      const item = document.createElement('div');
      item.className = `topic-list-item ${AppState.activeTopicId === topic.id ? 'active' : ''}`;
      item.innerHTML = `
        <span class="item-subject-tag">${topic.subject}</span>
        <div class="item-name">${topic.title}</div>
      `;
      item.addEventListener('click', () => {
        displayTopicDetail(topic.id);
      });
      container.appendChild(item);
    });
  }

  function selectFirstTopicInNotes() {
    if (typeof STUDY_DATA === 'undefined') return;
    const firstSubject = Object.values(STUDY_DATA)[0];
    if (firstSubject && firstSubject.topics.length > 0) {
      displayTopicDetail(firstSubject.topics[0].id);
    }
  }

  function displayTopicDetail(topicId) {
    const topic = findTopicById(topicId);
    if (!topic) return;

    AppState.activeTopicId = topic.id;
    markTopicStudied(topic.id);

    document.querySelectorAll('.topic-list-item').forEach(el => {
      const name = el.querySelector('.item-name')?.textContent;
      el.classList.toggle('active', name === topic.title);
    });

    const emptyState = document.getElementById('notes-empty-state');
    const article = document.getElementById('notes-content-article');
    if (emptyState) emptyState.classList.add('hidden');
    if (article) article.classList.remove('hidden');

    setElemText('article-subject-badge', topic.subject);
    setElemText('article-title', topic.title);
    setElemText('article-definition', topic.definition);

    const conceptsList = document.getElementById('article-key-concepts');
    if (conceptsList) {
      conceptsList.innerHTML = topic.key_concepts.map(k => `<li>${k}</li>`).join('');
    }

    const explanationEl = document.getElementById('article-explanation');
    if (explanationEl) {
      explanationEl.innerHTML = parseMarkdownToHTML(topic.explanation);
    }

    const exampleBlock = document.getElementById('article-example-block');
    const exampleCode = document.getElementById('article-example');
    if (exampleBlock && exampleCode) {
      if (topic.example) {
        exampleBlock.classList.remove('hidden');
        exampleCode.textContent = topic.example;
      } else {
        exampleBlock.classList.add('hidden');
      }
    }

    const appsList = document.getElementById('article-applications');
    if (appsList) {
      appsList.innerHTML = topic.applications.map(a => `<li>${a}</li>`).join('');
    }

    const pointsList = document.getElementById('article-important-points');
    if (pointsList) {
      pointsList.innerHTML = topic.important_points.map(p => `<li>${p}</li>`).join('');
    }

    setElemText('article-summary', topic.summary);

    const detailCard = document.getElementById('notes-detail-card');
    if (detailCard) detailCard.scrollTop = 0;
  }

  function openSubjectInNotes(subjectKey) {
    navigateTo('notes');
    const filterPills = document.querySelectorAll('#notes-subject-filters .filter-pill');
    filterPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.subject === subjectKey);
    });

    renderTopicList();

    if (STUDY_DATA[subjectKey] && STUDY_DATA[subjectKey].topics.length > 0) {
      displayTopicDetail(STUDY_DATA[subjectKey].topics[0].id);
    }
  }

  function openTopicById(topicId) {
    navigateTo('notes');
    displayTopicDetail(topicId);
  }

  function markTopicStudied(topicId) {
    if (!topicId) return;
    if (!AppState.studiedTopics.has(topicId)) {
      AppState.studiedTopics.add(topicId);
      Storage.set(STORAGE_KEYS.STUDIED_TOPICS, Array.from(AppState.studiedTopics));
      renderDashboardStats();
    }
  }

  // =========================================================================
  // 8. QUICK REVISION MODE
  // =========================================================================
  function setupQuickRevision() {
    const subjectSelect = document.getElementById('revision-subject-select');
    const startQuizBtn = document.getElementById('revision-start-quiz-btn');

    if (subjectSelect) {
      subjectSelect.addEventListener('change', () => {
        populateRevisionTopicChips(subjectSelect.value);
      });
      populateRevisionTopicChips(subjectSelect.value);
    }

    if (startQuizBtn) {
      startQuizBtn.addEventListener('click', () => {
        const sub = subjectSelect ? subjectSelect.options[subjectSelect.selectedIndex].text : 'Machine Learning';
        startQuizWithConfig(sub, 'all', 10);
      });
    }
  }

  function populateRevisionTopicChips(subjectKey) {
    const chipsContainer = document.getElementById('revision-topic-chips');
    if (!chipsContainer || !STUDY_DATA[subjectKey]) return;

    const topics = STUDY_DATA[subjectKey].topics;
    chipsContainer.innerHTML = '';

    topics.forEach((topic, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `revision-chip ${idx === 0 ? 'active' : ''}`;
      chip.textContent = topic.title;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.revision-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderRevisionSheet(topic);
      });
      chipsContainer.appendChild(chip);
    });

    if (topics.length > 0) {
      renderRevisionSheet(topics[0]);
    }
  }

  function renderRevisionSheet(topic) {
    if (!topic) return;

    markTopicStudied(topic.id);

    setElemText('revision-sheet-title', `${topic.title} – Quick Revision`);
    setElemText('revision-sheet-badge', topic.subject);

    const bulletsList = document.getElementById('revision-bullet-list');
    if (bulletsList) {
      bulletsList.innerHTML = topic.quick_revision.map(bullet => `<li>${bullet}</li>`).join('');
    }
  }

  function openTopicInRevision(topicId) {
    const topic = findTopicById(topicId);
    if (!topic) return;

    navigateTo('revision');

    let targetSubKey = 'machine_learning';
    Object.entries(STUDY_DATA).forEach(([k, v]) => {
      if (v.name.toLowerCase() === topic.subject.toLowerCase()) {
        targetSubKey = k;
      }
    });

    const subSelect = document.getElementById('revision-subject-select');
    if (subSelect) {
      subSelect.value = targetSubKey;
      populateRevisionTopicChips(targetSubKey);

      setTimeout(() => {
        document.querySelectorAll('.revision-chip').forEach(chip => {
          if (chip.textContent === topic.title) {
            chip.classList.add('active');
            renderRevisionSheet(topic);
          } else {
            chip.classList.remove('active');
          }
        });
      }, 50);
    }
  }

  // =========================================================================
  // 9. SHORT ANSWER GENERATOR
  // =========================================================================
  function setupShortAnswer() {
    const input = document.getElementById('short-answer-input');
    const generateBtn = document.getElementById('short-answer-generate-btn');
    const sampleChips = document.querySelectorAll('.sample-chip');
    const copyBtn = document.getElementById('sa-copy-btn');
    const askAnotherBtn = document.getElementById('sa-ask-another-btn');
    const quizBtn = document.getElementById('sa-quiz-btn');

    const handleGenerate = (queryText) => {
      const q = queryText || (input ? input.value.trim() : '');
      if (!q) {
        showToast('Please enter your question.');
        return;
      }
      generateShortAnswer(q);
    };

    if (generateBtn) {
      generateBtn.addEventListener('click', () => handleGenerate());
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleGenerate();
      });
    }

    sampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.q;
        if (input) input.value = q;
        handleGenerate(q);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', copyShortAnswerToClipboard);
    }

    if (askAnotherBtn) {
      askAnotherBtn.addEventListener('click', () => {
        if (input) {
          input.value = '';
          input.focus();
        }
        const resultCard = document.getElementById('short-answer-result');
        if (resultCard) resultCard.classList.add('hidden');
      });
    }

    if (quizBtn) {
      quizBtn.addEventListener('click', () => {
        navigateTo('quiz');
      });
    }
  }

  function generateShortAnswer(query) {
    const resultCard = document.getElementById('short-answer-result');
    const titleEl = document.getElementById('sa-result-title');
    const mainAnswerEl = document.getElementById('sa-main-answer');
    const examplesList = document.getElementById('sa-examples-list');
    const appsList = document.getElementById('sa-applications-list');
    const examPointEl = document.getElementById('sa-exam-point');

    const match = findClosestTopic(query);

    if (!match) {
      showToast('No matching topic found. Try asking about Machine Learning, Python, DBMS, or Networks.');
      return;
    }

    markTopicStudied(match.id);

    const sa = match.short_answer;
    if (titleEl) titleEl.textContent = `Answer: ${match.title}`;
    if (mainAnswerEl) mainAnswerEl.textContent = sa.answer;
    if (examplesList) {
      examplesList.innerHTML = sa.examples.map(ex => `<li>${ex}</li>`).join('');
    }
    if (appsList) {
      appsList.innerHTML = sa.applications.map(app => `<li>${app}</li>`).join('');
    }
    if (examPointEl) examPointEl.textContent = sa.exam_point;

    if (resultCard) {
      resultCard.classList.remove('hidden');
      resultCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function copyShortAnswerToClipboard() {
    const title = document.getElementById('sa-result-title')?.textContent || 'Answer';
    const answer = document.getElementById('sa-main-answer')?.textContent || '';
    const examPoint = document.getElementById('sa-exam-point')?.textContent || '';

    const textToCopy = `${title}\n\n${answer}\n\nExam Takeaway:\n${examPoint}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('Answer copied to clipboard.');
    }).catch(() => {
      showToast('Failed to copy to clipboard.');
    });
  }

  // =========================================================================
  // 10. INTERACTIVE QUIZ ENGINE
  // =========================================================================
  function setupQuizEngine() {
    const startBtn = document.getElementById('btn-start-quiz');
    const prevBtn = document.getElementById('quiz-btn-prev');
    const nextBtn = document.getElementById('quiz-btn-next');
    const submitBtn = document.getElementById('quiz-btn-submit');
    const retryBtn = document.getElementById('btn-result-retry');
    const dashBtn = document.getElementById('btn-result-dashboard');
    const revBtn = document.getElementById('btn-result-revision');
    const reviewBtn = document.getElementById('btn-review-answers');
    const closeReviewBtn = document.getElementById('btn-close-review');

    const countPills = document.querySelectorAll('.question-count-pills .count-pill');
    countPills.forEach(pill => {
      pill.addEventListener('click', () => {
        countPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const subSelect = document.getElementById('quiz-subject-select');
        const diffSelect = document.getElementById('quiz-difficulty-select');
        const activeCountPill = document.querySelector('.question-count-pills .count-pill.active');

        const subject = subSelect ? subSelect.value : 'all';
        const difficulty = diffSelect ? diffSelect.value : 'all';
        const count = activeCountPill ? parseInt(activeCountPill.dataset.count, 10) : 10;

        startQuizWithConfig(subject, difficulty, count);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (AppState.quiz.currentIndex > 0) {
          AppState.quiz.currentIndex -= 1;
          renderActiveQuestion();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (AppState.quiz.currentIndex < AppState.quiz.questions.length - 1) {
          AppState.quiz.currentIndex += 1;
          renderActiveQuestion();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        submitQuiz();
      });
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        startQuizWithConfig(AppState.quiz.subject, AppState.quiz.difficulty, AppState.quiz.questions.length);
      });
    }

    if (dashBtn) {
      dashBtn.addEventListener('click', () => {
        navigateTo('dashboard');
      });
    }

    if (revBtn) {
      revBtn.addEventListener('click', () => {
        navigateTo('revision');
      });
    }

    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const reviewSection = document.getElementById('quiz-review-section');
        if (reviewSection) {
          reviewSection.classList.remove('hidden');
          renderQuizReviewItems();
          reviewSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (closeReviewBtn) {
      closeReviewBtn.addEventListener('click', () => {
        const reviewSection = document.getElementById('quiz-review-section');
        if (reviewSection) reviewSection.classList.add('hidden');
      });
    }
  }

  function startQuizWithConfig(subject, difficulty, questionCount) {
    if (typeof QUIZ_DATA === 'undefined') {
      showToast('Quiz questions are not loaded.');
      return;
    }

    navigateTo('quiz');

    let pool = QUIZ_DATA.slice();

    if (subject && subject !== 'all') {
      pool = pool.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
    }

    if (difficulty && difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (pool.length === 0) {
      showToast('No questions available for this selection. Try broader filters.');
      return;
    }

    const shuffled = shuffleArray(pool);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    AppState.quiz.active = true;
    AppState.quiz.questions = selected;
    AppState.quiz.currentIndex = 0;
    AppState.quiz.userAnswers = {};
    AppState.quiz.subject = subject;
    AppState.quiz.difficulty = difficulty;
    AppState.quiz.timerSeconds = 0;

    setElemHidden('quiz-setup-view', true);
    setElemHidden('quiz-active-view', false);
    setElemHidden('quiz-result-view', true);
    setElemHidden('quiz-review-section', true);

    startQuizTimer();
    renderActiveQuestion();
  }

  function startQuizTimer() {
    clearInterval(AppState.quiz.timerInterval);
    AppState.quiz.timerSeconds = 0;
    updateTimerDisplay();

    AppState.quiz.timerInterval = setInterval(() => {
      AppState.quiz.timerSeconds += 1;
      updateTimerDisplay();
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('quiz-timer');
    if (!timerEl) return;

    const m = Math.floor(AppState.quiz.timerSeconds / 60).toString().padStart(2, '0');
    const s = (AppState.quiz.timerSeconds % 60).toString().padStart(2, '0');
    timerEl.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${m}:${s}`;
  }

  function renderActiveQuestion() {
    const qIndex = AppState.quiz.currentIndex;
    const totalQ = AppState.quiz.questions.length;
    const currentQ = AppState.quiz.questions[qIndex];

    if (!currentQ) return;

    setElemText('active-question-counter', `Question ${qIndex + 1} of ${totalQ}`);
    setElemText('active-difficulty-tag', currentQ.difficulty);
    setElemText('active-subject-tag', currentQ.subject);

    const progressPct = Math.round(((qIndex + 1) / totalQ) * 100);
    const fillEl = document.getElementById('quiz-progress-fill');
    if (fillEl) fillEl.style.width = `${progressPct}%`;

    setElemText('active-question-text', currentQ.question);

    const optionsContainer = document.getElementById('active-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const selectedOption = AppState.quiz.userAnswers[qIndex];

      currentQ.options.forEach((optText, optIdx) => {
        const card = document.createElement('div');
        const isSelected = selectedOption === optIdx;
        card.className = `option-card ${isSelected ? 'selected' : ''}`;
        card.innerHTML = `
          <span class="opt-prefix">${letters[optIdx]}</span>
          <span class="opt-text">${optText}</span>
        `;
        card.addEventListener('click', () => {
          AppState.quiz.userAnswers[qIndex] = optIdx;
          renderActiveQuestion();
        });
        optionsContainer.appendChild(card);
      });
    }

    const indicator = document.getElementById('quiz-answered-indicator');
    if (indicator) {
      const hasAnswered = AppState.quiz.userAnswers[qIndex] !== undefined;
      indicator.textContent = hasAnswered ? 'Answer recorded' : 'Not answered yet';
      indicator.style.color = hasAnswered ? 'var(--text-main)' : 'var(--text-muted)';
    }

    const prevBtn = document.getElementById('quiz-btn-prev');
    const nextBtn = document.getElementById('quiz-btn-next');
    const submitBtn = document.getElementById('quiz-btn-submit');

    if (prevBtn) prevBtn.disabled = qIndex === 0;

    const isLast = qIndex === totalQ - 1;
    if (nextBtn) nextBtn.classList.toggle('hidden', isLast);
    if (submitBtn) submitBtn.classList.toggle('hidden', !isLast);
  }

  function submitQuiz() {
    clearInterval(AppState.quiz.timerInterval);

    const totalQuestions = AppState.quiz.questions.length;
    let correctCount = 0;
    const strongTopics = new Set();
    const weakTopics = new Set();

    AppState.quiz.questions.forEach((q, idx) => {
      const userChoice = AppState.quiz.userAnswers[idx];
      const isCorrect = userChoice === q.correct;

      if (isCorrect) {
        correctCount += 1;
        strongTopics.add(q.topic);
      } else {
        weakTopics.add(q.topic);
        const matchedTopic = findTopicByName(q.topic);
        const topicId = matchedTopic ? matchedTopic.id : q.topic.toLowerCase().replace(/\s+/g, '-');
        AppState.weakTopics[topicId] = (AppState.weakTopics[topicId] || 0) + 1;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    Storage.set(STORAGE_KEYS.WEAK_TOPICS, AppState.weakTopics);

    const record = {
      id: Date.now(),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      subject: AppState.quiz.subject === 'all' ? 'All Subjects' : AppState.quiz.subject,
      score: correctCount,
      total: totalQuestions,
      percentage: percentage,
      durationSeconds: AppState.quiz.timerSeconds
    };
    AppState.quizHistory.unshift(record);
    Storage.set(STORAGE_KEYS.QUIZ_HISTORY, AppState.quizHistory);

    setElemHidden('quiz-active-view', true);
    setElemHidden('quiz-result-view', false);

    renderQuizResults(correctCount, totalQuestions, percentage, Array.from(strongTopics), Array.from(weakTopics));
  }

  function renderQuizResults(correct, total, percentage, strongTopics, weakTopics) {
    setElemText('result-score-text', `${correct} / ${total}`);
    setElemText('result-percent-text', `${percentage}%`);
    setElemText('result-correct-count', correct);
    setElemText('result-incorrect-count', total - correct);

    let tierText = '';
    if (percentage >= 90) {
      tierText = 'Distinction (90-100%)';
    } else if (percentage >= 75) {
      tierText = 'High Merit (75-89%)';
    } else if (percentage >= 60) {
      tierText = 'Merit (60-74%)';
    } else if (percentage >= 40) {
      tierText = 'Pass (40-59%)';
    } else {
      tierText = 'Review Recommended (<40%)';
    }

    setElemText('result-tier-badge', tierText);

    const strongContainer = document.getElementById('result-strong-areas');
    if (strongContainer) {
      if (strongTopics.length === 0) {
        strongContainer.innerHTML = '<span class="topic-tag">Complete more questions to identify top areas.</span>';
      } else {
        strongContainer.innerHTML = strongTopics.map(t => `<span class="topic-tag">${t}</span>`).join('');
      }
    }

    const weakContainer = document.getElementById('result-weak-areas');
    if (weakContainer) {
      if (weakTopics.length === 0) {
        weakContainer.innerHTML = '<span class="topic-tag" style="background-color: var(--bg-surface-alt); color: var(--text-main);">No incorrect answers. Exceptional performance.</span>';
      } else {
        weakContainer.innerHTML = weakTopics.map(t => `<span class="topic-tag">${t}</span>`).join('');
      }
    }
  }

  function renderQuizReviewItems() {
    const container = document.getElementById('review-items-list');
    if (!container) return;

    container.innerHTML = '';
    AppState.quiz.questions.forEach((q, idx) => {
      const userChoice = AppState.quiz.userAnswers[idx];
      const isCorrect = userChoice === q.correct;
      const letters = ['A', 'B', 'C', 'D'];

      const userAnsText = userChoice !== undefined ? `${letters[userChoice]}. ${q.options[userChoice]}` : 'No answer selected';
      const correctAnsText = `${letters[q.correct]}. ${q.options[q.correct]}`;

      const card = document.createElement('div');
      card.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
      card.innerHTML = `
        <div class="q-meta">Question ${idx + 1} of ${AppState.quiz.questions.length} • ${q.subject} (${q.topic})</div>
        <div class="q-title">${q.question}</div>
        <div class="q-answer-details">
          <div><strong>Your Selection:</strong> <span style="color: ${isCorrect ? 'var(--text-main)' : 'var(--danger)'}">${userAnsText}</span></div>
          ${!isCorrect ? `<div><strong>Correct Answer:</strong> <span style="color: var(--primary)">${correctAnsText}</span></div>` : ''}
        </div>
        <div class="q-explanation">
          <strong>Academic Explanation:</strong> ${q.explanation}
        </div>
      `;
      container.appendChild(card);
    });
  }

  // =========================================================================
  // 11. PROGRESS DASHBOARD
  // =========================================================================
  function renderProgressSection() {
    setElemText('prog-topics-count', AppState.studiedTopics.size);
    setElemText('prog-quizzes-count', AppState.quizHistory.length);

    const totalQAnswered = AppState.quizHistory.reduce((sum, q) => sum + q.total, 0);
    setElemText('prog-questions-count', totalQAnswered);

    if (AppState.quizHistory.length === 0) {
      setElemText('prog-avg-score', '0%');
    } else {
      const totalPct = AppState.quizHistory.reduce((sum, q) => sum + q.percentage, 0);
      setElemText('prog-avg-score', `${Math.round(totalPct / AppState.quizHistory.length)}%`);
    }

    renderSubjectProgressBars();
    renderProgressRecommendations();
    renderQuizHistoryTable();
  }

  function renderSubjectProgressBars() {
    const container = document.getElementById('subject-progress-bars');
    if (!container || typeof STUDY_DATA === 'undefined') return;

    container.innerHTML = '';

    Object.entries(STUDY_DATA).forEach(([subKey, subject]) => {
      const mono = MONOGRAMS[subKey] || 'SC';
      const totalTopicsInSub = subject.topics.length;
      const studiedInSub = subject.topics.filter(t => AppState.studiedTopics.has(t.id)).length;
      const completionPct = Math.round((studiedInSub / totalTopicsInSub) * 100);

      const row = document.createElement('div');
      row.className = 'subject-bar-row';
      row.innerHTML = `
        <div class="bar-meta">
          <span class="prog-subj-name"><span class="prog-mono-badge">${mono}</span> ${subject.name}</span>
          <span>${studiedInSub}/${totalTopicsInSub} Topics (${completionPct}%)</span>
        </div>
        <div class="bar-outer">
          <div class="bar-inner" style="width: ${completionPct}%;"></div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  function renderProgressRecommendations() {
    const container = document.getElementById('progress-recommendations-list');
    if (!container) return;

    const recommendations = generateRecommendations();
    container.innerHTML = '';

    recommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'rec-card';
      card.innerHTML = `
        <div>
          <div class="rec-header">
            <span class="rec-tag">${rec.tag}</span>
          </div>
          <p class="rec-text">${rec.text}</p>
        </div>
        <div class="rec-actions">
          <button class="btn btn-sm btn-outline btn-prog-review">Review Topic</button>
          <button class="btn btn-sm btn-primary btn-prog-quiz">Practice</button>
        </div>
      `;

      card.querySelector('.btn-prog-review').addEventListener('click', () => {
        openTopicById(rec.topicId);
      });

      card.querySelector('.btn-prog-quiz').addEventListener('click', () => {
        startQuizWithConfig(rec.subject, 'all', 10);
      });

      container.appendChild(card);
    });
  }

  function renderQuizHistoryTable() {
    const tbody = document.getElementById('quiz-history-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (AppState.quizHistory.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">No evaluation records available. Complete an evaluation to view history.</td></tr>`;
      return;
    }

    AppState.quizHistory.slice(0, 10).forEach(q => {
      let tier = 'Merit';
      if (q.percentage >= 90) tier = 'Distinction';
      else if (q.percentage >= 75) tier = 'High Merit';
      else if (q.percentage < 60) tier = 'Pass / Review';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${q.date}</td>
        <td><strong>${q.subject}</strong></td>
        <td>${q.score} / ${q.total}</td>
        <td><strong>${q.percentage}%</strong></td>
        <td><span class="history-tier-pill">${tier}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // =========================================================================
  // 12. SETTINGS & DATA RESET CONTROLLERS
  // =========================================================================
  function setupSettings() {
    const clearChatBtn = document.getElementById('btn-clear-chat-history');
    const clearQuizBtn = document.getElementById('btn-clear-quiz-history');
    const resetProgBtn = document.getElementById('btn-reset-progress');
    const clearAllBtn = document.getElementById('btn-clear-all-data');
    const prefSubSelect = document.getElementById('pref-default-subject');
    const prefDiffSelect = document.getElementById('pref-default-difficulty');

    if (prefSubSelect) {
      prefSubSelect.addEventListener('change', () => {
        AppState.preferences.defaultSubject = prefSubSelect.value;
        Storage.set(STORAGE_KEYS.PREF_SUBJECT, prefSubSelect.value);
        showToast('Default subject saved.');
      });
    }

    if (prefDiffSelect) {
      prefDiffSelect.addEventListener('change', () => {
        AppState.preferences.defaultDifficulty = prefDiffSelect.value;
        Storage.set(STORAGE_KEYS.PREF_DIFFICULTY, prefDiffSelect.value);
        showToast('Default quiz difficulty saved.');
      });
    }

    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        showConfirmModal(
          'Clear Chat Conversation',
          'Are you sure you want to clear your AI chat history?',
          () => {
            AppState.chatHistory = [];
            Storage.set(STORAGE_KEYS.CHAT_HISTORY, []);
            renderChatMessages();
            showToast('Chat history cleared.');
          }
        );
      });
    }

    if (clearQuizBtn) {
      clearQuizBtn.addEventListener('click', () => {
        showConfirmModal(
          'Clear Evaluation Records',
          'Are you sure you want to clear all completed evaluation records and scores?',
          () => {
            AppState.quizHistory = [];
            Storage.set(STORAGE_KEYS.QUIZ_HISTORY, []);
            AppState.weakTopics = {};
            Storage.set(STORAGE_KEYS.WEAK_TOPICS, {});
            renderDashboardStats();
            renderProgressSection();
            showToast('Evaluation history cleared.');
          }
        );
      });
    }

    if (resetProgBtn) {
      resetProgBtn.addEventListener('click', () => {
        showConfirmModal(
          'Reset Academic Progress',
          'Are you sure you want to reset your studied topics count and daily streak?',
          () => {
            AppState.studiedTopics.clear();
            Storage.set(STORAGE_KEYS.STUDIED_TOPICS, []);
            AppState.studyStreak = 1;
            Storage.set(STORAGE_KEYS.STUDY_STREAK, 1);
            updateStudyStreak();
            renderDashboardStats();
            renderProgressSection();
            showToast('Progress and streak reset.');
          }
        );
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        showConfirmModal(
          'Reset All Local Data (Factory Reset)',
          'WARNING: This will permanently delete all study progress, quiz records, chat history, and personal preferences from this browser. Do you wish to continue?',
          () => {
            Storage.clearAll();
            AppState.studiedTopics.clear();
            AppState.quizHistory = [];
            AppState.weakTopics = {};
            AppState.chatHistory = [];
            AppState.studyStreak = 1;
            applyTheme('light');
            updateStudyStreak();
            renderDashboardStats();
            renderChatMessages();
            renderProgressSection();
            showToast('All local data cleared. Reset to default state.');
          }
        );
      });
    }
  }

  // =========================================================================
  // 13. UTILITY FUNCTIONS & HELPERS
  // =========================================================================
  function findClosestTopic(query) {
    if (typeof STUDY_DATA === 'undefined') return null;

    const q = query.toLowerCase().trim();
    let bestTopic = null;
    let highestScore = 0;

    Object.values(STUDY_DATA).forEach(subject => {
      subject.topics.forEach(topic => {
        let score = 0;
        const titleLower = topic.title.toLowerCase();

        if (titleLower === q) score += 100;
        else if (titleLower.includes(q)) score += 40;
        else if (q.includes(titleLower)) score += 35;

        topic.keywords.forEach(kw => {
          const kwLower = kw.toLowerCase();
          if (q.includes(kwLower) || kwLower.includes(q)) {
            score += 20;
          }
        });

        if (topic.definition.toLowerCase().includes(q)) score += 10;

        if (score > highestScore) {
          highestScore = score;
          bestTopic = topic;
        }
      });
    });

    return highestScore >= 10 ? bestTopic : null;
  }

  function findTopicById(topicId) {
    if (typeof STUDY_DATA === 'undefined') return null;
    for (const sub of Object.values(STUDY_DATA)) {
      const match = sub.topics.find(t => t.id === topicId);
      if (match) return match;
    }
    return null;
  }

  function findTopicByName(title) {
    if (typeof STUDY_DATA === 'undefined') return null;
    const lower = title.toLowerCase();
    for (const sub of Object.values(STUDY_DATA)) {
      const match = sub.topics.find(t => t.title.toLowerCase() === lower);
      if (match) return match;
    }
    return null;
  }

  function searchAllTopics(query) {
    if (typeof STUDY_DATA === 'undefined') return [];
    const q = query.toLowerCase();
    const results = [];

    Object.values(STUDY_DATA).forEach(sub => {
      sub.topics.forEach(topic => {
        if (
          topic.title.toLowerCase().includes(q) ||
          topic.definition.toLowerCase().includes(q) ||
          topic.keywords.some(k => k.toLowerCase().includes(q))
        ) {
          results.push(topic);
        }
      });
    });

    return results;
  }

  function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function parseMarkdownToHTML(text) {
    if (!text) return '';

    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');

    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    html = html.replace(/```([\s\S]*?)```/gim, '<pre class="code-container"><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

    html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    html = html.replace(/\n\n/g, '<br><br>');

    return html;
  }

  function formatCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function showConfirmModal(title, message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    const cancelBtn = document.getElementById('modal-btn-cancel');
    const confirmBtn = document.getElementById('modal-btn-confirm');

    if (!modal) return;

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    modal.classList.remove('hidden');

    const handleConfirm = () => {
      cleanup();
      if (typeof onConfirm === 'function') onConfirm();
    };

    const handleCancel = () => {
      cleanup();
    };

    const cleanup = () => {
      modal.classList.add('hidden');
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
  }

  function setElemText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setElemHidden(id, isHidden) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', isHidden);
  }

  // =========================================================================
  // BOOTSTRAP APPLICATION
  // =========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initApp();
  });

})();
