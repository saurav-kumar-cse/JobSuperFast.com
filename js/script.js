/* ============================================================
   JobSuperFast — script.js
   One shared file used by every page.

   Sections in this file:
   1. Demo job data (used when Firebase isn't connected yet)
   2. Theme (dark/light) handling
   3. Tiny "auth" system — real Firebase if FIREBASE_ENABLED,
      otherwise a localStorage-based demo login so the site is
      fully clickable without a Firebase project set up.
   4. Saved-jobs (bookmark) handling
   5. Header/ticker rendering helpers (used on every page)
   6. Job card rendering helpers (used on index.html + jobs.html)
   7. Modal + toast helpers
   ============================================================ */

/* ---------- 1. DEMO JOB DATA ---------- */
/* Replace this with real Firestore reads once Firebase is connected.
   See the loadJobs() function below — it already checks
   FIREBASE_ENABLED and will use Firestore automatically when true. */
const DEMO_JOBS = [
  {
    id: "ssc-cgl-2025",
    title: "SSC CGL 2025 Tier-I Online Form for 17,727 Posts",
    orgShort: "SSC",
    orgFull: "Staff Selection Commission (SSC)",
    orgIcon: "🏛️",
    category: "latest-jobs",
    qualification: "Graduate",
    state: "All India",
    org: "SSC",
    totalVacancies: "17,727 Posts",
    lastDate: "24/07/2025 (11:00 PM)",
    postDate: "2025-07-01",
    badges: ["hot", "new"],
    ageLimit: "18-32 years (as on 01/08/2025)",
    fee: "₹100 (General/OBC), Exempted for SC/ST/PwD/Women",
    applyLink: "#",
    notificationLink: "#",
    details: "Combined Graduate Level Examination for various Group B and Group C posts in Central Government Ministries/Departments/Organisations."
  },
  {
    id: "rrb-ntpc-2025",
    title: "Railway RRB NTPC Graduate & Non-Graduate Recruitment 2025 (11,558 Posts)",
    orgShort: "RAILWAY/RRB",
    orgFull: "Railway Recruitment Boards (RRB)",
    orgIcon: "🚆",
    category: "latest-jobs",
    qualification: "10+2 / Graduate",
    state: "All India",
    org: "RRB",
    totalVacancies: "11,558 Posts",
    lastDate: "20/10/2025",
    postDate: "2025-06-28",
    badges: ["hot", "new"],
    ageLimit: "18-33 years",
    fee: "₹500 (General), ₹250 (SC/ST/Women/PwD/Ex-Servicemen)",
    applyLink: "#",
    notificationLink: "#",
    details: "Non-Technical Popular Categories recruitment across various zonal railways for graduate and non-graduate posts."
  },
  {
    id: "upsc-cse-admit-2025",
    title: "UPSC Civil Services (IAS/IFS) Prelims 2025 Admit Card Released",
    orgShort: "UPSC",
    orgFull: "Union Public Service Commission (UPSC)",
    orgIcon: "⚖️",
    category: "admit-cards",
    qualification: "Graduate",
    state: "All India",
    org: "UPSC",
    totalVacancies: "1,056 Posts",
    lastDate: "05/03/2025",
    postDate: "2025-06-20",
    badges: ["hot", "new"],
    ageLimit: "21-32 years",
    fee: "₹100 (General/OBC), Exempted for SC/ST/PwD/Women",
    applyLink: "#",
    notificationLink: "#",
    details: "Admit cards released for Civil Services Preliminary Examination 2025. Download from the official UPSC portal."
  },
  {
    id: "ibps-po-result-2025",
    title: "IBPS PO 2025 Prelims Result Declared",
    orgShort: "IBPS",
    orgFull: "Institute of Banking Personnel Selection",
    orgIcon: "🏦",
    category: "results",
    qualification: "Graduate",
    state: "All India",
    org: "IBPS",
    totalVacancies: "3,150 Posts",
    lastDate: "Declared",
    postDate: "2025-06-15",
    badges: ["new"],
    ageLimit: "20-30 years",
    fee: "₹850 (General/OBC), ₹175 (SC/ST/PwD)",
    applyLink: "#",
    notificationLink: "#",
    details: "Prelims result for Probationary Officer recruitment 2025 declared. Mains exam call letters to follow shortly."
  },
  {
    id: "cbse-ctet-answerkey-2025",
    title: "CTET July 2025 Answer Key Released",
    orgShort: "CBSE",
    orgFull: "Central Board of Secondary Education",
    orgIcon: "📘",
    category: "answer-keys",
    qualification: "12th / Graduate",
    state: "All India",
    org: "CBSE",
    totalVacancies: "—",
    lastDate: "Objection Window: 10 Days",
    postDate: "2025-06-10",
    badges: ["new"],
    ageLimit: "No age limit",
    fee: "₹1,000 (Paper I or II), ₹1,200 (Both)",
    applyLink: "#",
    notificationLink: "#",
    details: "Provisional answer key released for Central Teacher Eligibility Test July 2025 cycle."
  },
  {
    id: "neet-syllabus-2025",
    title: "NEET UG 2026 Syllabus & Exam Pattern Released",
    orgShort: "NTA",
    orgFull: "National Testing Agency",
    orgIcon: "🩺",
    category: "syllabus",
    qualification: "12th (Science)",
    state: "All India",
    org: "NTA",
    totalVacancies: "—",
    lastDate: "N/A",
    postDate: "2025-06-05",
    badges: [],
    ageLimit: "17+ years",
    fee: "₹1,700 (General)",
    applyLink: "#",
    notificationLink: "#",
    details: "Updated syllabus and exam pattern for NEET UG 2026 released by NTA for medical aspirants."
  },
  {
    id: "aiims-nursing-admission-2025",
    title: "AIIMS Nursing Officer Admission Notification 2025",
    orgShort: "AIIMS",
    orgFull: "All India Institute of Medical Sciences",
    orgIcon: "🏥",
    category: "admissions",
    qualification: "B.Sc Nursing",
    state: "All India",
    org: "AIIMS",
    totalVacancies: "2,300 Posts",
    lastDate: "15/08/2025",
    postDate: "2025-06-25",
    badges: ["hot"],
    ageLimit: "21-30 years",
    fee: "₹3,000 (General/OBC), ₹2,400 (SC/ST)",
    applyLink: "#",
    notificationLink: "#",
    details: "Recruitment notification for Nursing Officer posts across AIIMS institutions nationwide."
  },
  {
    id: "police-constable-haryana-2025",
    title: "Haryana Police Constable Recruitment 2025 (5,600 Posts)",
    orgShort: "HSSC",
    orgFull: "Haryana Staff Selection Commission",
    orgIcon: "👮",
    category: "latest-jobs",
    qualification: "12th",
    state: "Haryana",
    org: "HSSC",
    totalVacancies: "5,600 Posts",
    lastDate: "30/07/2025",
    postDate: "2025-06-30",
    badges: ["new", "hot"],
    ageLimit: "18-25 years",
    fee: "₹100 (General), ₹25 (SC/ST/PwD)",
    applyLink: "#",
    notificationLink: "#",
    details: "Direct recruitment to the post of Constable (General Duty) in Haryana Police."
  }
];

/* ---------- 2. THEME HANDLING ---------- */
function initTheme() {
  const saved = localStorage.getItem("jsf_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("jsf_theme", next);
}

/* ---------- 3. AUTH (demo-mode aware) ---------- */
/* In demo mode we just store a fake user object in localStorage.
   When you enable Firebase, swap the bodies of these three
   functions for real firebase.auth() calls — the rest of the
   site (header, dashboard, save button) already reads from
   getCurrentUser() / login() / logout() so nothing else changes. */
function getCurrentUser() {
  const raw = localStorage.getItem("jsf_user");
  return raw ? JSON.parse(raw) : null;
}

function demoLogin(name, email) {
  const user = { name: name || email.split("@")[0], email, uid: "demo-" + email };
  localStorage.setItem("jsf_user", JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem("jsf_user");
  window.location.reload();
}

/* ---------- 4. SAVED JOBS (bookmarks) ---------- */
function getSavedJobIds() {
  const raw = localStorage.getItem("jsf_saved_jobs");
  return raw ? JSON.parse(raw) : [];
}
function toggleSaveJob(jobId) {
  const user = getCurrentUser();
  if (!user) {
    openModal("login-modal");
    return false;
  }
  let saved = getSavedJobIds();
  const isSaved = saved.includes(jobId);
  saved = isSaved ? saved.filter((id) => id !== jobId) : [...saved, jobId];
  localStorage.setItem("jsf_saved_jobs", JSON.stringify(saved));
  showToast(isSaved ? "Removed from Saved Jobs" : "Job saved");
  return !isSaved;
}

/* ---------- 5. HEADER + TICKER RENDERING ---------- */
/* Every page has <div id="app-header"></div> and
   <div id="app-ticker"></div> placeholders — this fills them in
   so we don't repeat the same 60 lines of HTML on every page. */
function renderTicker() {
  const el = document.getElementById("app-ticker");
  if (!el) return;
  const items = DEMO_JOBS.slice(0, 6);
  const itemsHtml = items
    .map((j) => `<span>✨ ${j.title} — Last Date: ${j.lastDate}</span>`)
    .join("");
  el.innerHTML = `
    <div class="ticker-bar">
      <div class="ticker-label">🔔 LIVE ALERTS</div>
      <div class="ticker-track-wrap">
        <div class="ticker-track">${itemsHtml}${itemsHtml}</div>
      </div>
    </div>`;
}

function renderHeader(activePage) {
  const utilityEl = document.getElementById("app-utility");
  const headerEl = document.getElementById("app-header");
  const user = getCurrentUser();
  const savedCount = getSavedJobIds().length;

  if (utilityEl) {
    utilityEl.innerHTML = `
      <div class="utility-bar">
        <div class="container">
          <div class="utility-left">
            <span class="pulse-dot"></span>
            <span>Sarkari Job Update Portal 2025</span>
            <span class="status-chip">💾 Cloud Sync Active</span>
          </div>
          <div class="utility-right">
            <button class="util-btn telegram">📣 Join Telegram</button>
            <button class="util-btn whatsapp">💬 WhatsApp Channel</button>
            <button class="util-btn hindi">🌐 हिंदी में देखें</button>
          </div>
        </div>
      </div>`;
  }

  if (headerEl) {
    headerEl.innerHTML = `
      <header class="site-header">
        <div class="container">
          <a href="index.html" class="brand">
            <div class="brand-mark">⚡</div>
            <div class="brand-text-wrap">
              <div class="brand-name-row">
                <span class="brand-name">JobSuperFast</span>
                <span class="official-badge">OFFICIAL</span>
              </div>
              <span class="brand-tagline">Sarkari Result • Admit Card • Latest Vacancies</span>
            </div>
          </a>
          <div class="nav-tools">
            <button class="tool-btn ai" onclick="openModal('ai-advisor-modal')">✨ AI Job Advisor</button>
            <a class="tool-btn age" href="age-calculator.html">📅 Age Calculator</a>
            <a class="tool-btn photo" href="photo-resizer.html">🖼️ Photo Resizer</a>
            <a class="tool-btn quiz" href="mock-quiz.html">❓ Mock Quiz</a>
            <a class="tool-btn saved" href="dashboard.html">🔖 Saved (${savedCount})</a>
            <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark or light mode">
              <span class="knob">🌙</span>
            </button>
            ${
              user
                ? `<div class="user-menu-wrap">
                    <div class="user-chip visible" onclick="document.getElementById('user-dropdown').classList.toggle('open')">
                      <span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>
                      ${user.name}
                    </div>
                    <div class="user-dropdown" id="user-dropdown">
                      <a href="dashboard.html">My Saved Jobs</a>
                      <button onclick="logout()">Logout</button>
                    </div>
                  </div>`
                : `<button class="tool-btn signin" onclick="openModal('login-modal')">➜ Sign In</button>`
            }
          </div>
        </div>
      </header>`;
  }
}

/* ---------- 6. JOB CARD RENDERING ---------- */
function loadJobs() {
  // FIREBASE_ENABLED comes from firebase-config.js.
  // When true, replace this with a real Firestore query, e.g.:
  //   const snap = await firebase.firestore().collection('jobs').orderBy('postDate','desc').get();
  //   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return DEMO_JOBS;
}

function badgeHtml(badges) {
  return (badges || [])
    .map((b) => `<span class="badge ${b}">${b.toUpperCase()}</span>`)
    .join("");
}

function jobCardHtml(job) {
  const saved = getSavedJobIds().includes(job.id);
  const urgent = job.lastDate && job.lastDate !== "N/A" && job.lastDate !== "Declared";
  return `
    <div class="job-card" onclick="if(!event.target.closest('.bookmark-btn')) window.location.href='job-detail.html?id=${job.id}'">
      <div class="job-card-top">
        <div class="org-info">
          <div class="org-logo">${job.orgIcon}</div>
          <div>
            <div class="org-name-short">${job.orgShort}</div>
            <div class="org-name-full">${job.orgFull}</div>
          </div>
        </div>
        <button class="bookmark-btn ${saved ? "saved" : ""}" onclick="event.stopPropagation(); this.classList.toggle('saved', toggleSaveJob('${job.id}')); renderHeader();">
          ${saved ? "★" : "☆"}
        </button>
      </div>
      <div class="badge-row">
        ${badgeHtml(job.badges)}
        <span class="badge location">📍 ${job.state}</span>
      </div>
      <div class="job-title">${job.title}</div>
      <div class="job-info-boxes">
        <div class="info-box">
          <div class="label">👥 TOTAL VACANCIES</div>
          <div class="value">${job.totalVacancies}</div>
        </div>
        <div class="info-box ${urgent ? "urgent" : ""}">
          <div class="label">🕒 LAST DATE</div>
          <div class="value">${job.lastDate}</div>
        </div>
      </div>
    </div>`;
}

/* ---------- 7. MODAL + TOAST HELPERS ---------- */
function openModal(id) {
  document.getElementById(id)?.classList.add("open");
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
}
function showToast(message, isError) {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (isError ? " error" : "");
  toast.textContent = message;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ---------- LOGIN / REGISTER FORM HANDLING ---------- */
function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-password").value;
  if (!email || !pass) {
    showToast("Please fill all fields", true);
    return;
  }
  // Real Firebase version:
  // firebase.auth().signInWithEmailAndPassword(email, pass)...
  demoLogin(null, email);
  closeModal("login-modal");
  showToast("Logged in successfully");
  renderHeader();
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const pass = document.getElementById("register-password").value;
  if (!name || !email || !pass) {
    showToast("Please fill all fields", true);
    return;
  }
  // Real Firebase version:
  // firebase.auth().createUserWithEmailAndPassword(email, pass)...
  demoLogin(name, email);
  closeModal("login-modal");
  showToast("Account created — welcome!");
  renderHeader();
}

function handleGoogleSignIn() {
  // Real Firebase version:
  // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())...
  demoLogin("Google User", "googleuser@example.com");
  closeModal("login-modal");
  showToast("Signed in with Google");
  renderHeader();
}

function switchAuthTab(tab) {
  document.getElementById("tab-login").classList.toggle("active", tab === "login");
  document.getElementById("tab-register").classList.toggle("active", tab === "register");
  document.getElementById("login-form").style.display = tab === "login" ? "block" : "none";
  document.getElementById("register-form").style.display = tab === "register" ? "block" : "none";
}

/* ---------- SHARED MODALS (login + AI advisor) ---------- */
/* Injected into <div id="app-modals"></div> on every page so we
   don't repeat the same modal markup in every HTML file. */
function renderModals() {
  const el = document.getElementById("app-modals");
  if (!el) return;
  el.innerHTML = `
    <div class="modal-overlay" id="login-modal">
      <div class="modal-box">
        <button class="modal-close" onclick="closeModal('login-modal')">✕</button>
        <h2 class="modal-title">Welcome to JobSuperFast</h2>
        <p class="modal-sub">Sign in to save jobs and get alerts</p>
        <div class="auth-tabs">
          <button id="tab-login" class="active" onclick="switchAuthTab('login')">Login</button>
          <button id="tab-register" onclick="switchAuthTab('register')">Register</button>
        </div>
        <form id="login-form" onsubmit="handleLoginSubmit(event)">
          <div class="field">
            <label for="login-email">Email</label>
            <input id="login-email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="field">
            <label for="login-password">Password</label>
            <input id="login-password" type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
        <form id="register-form" style="display:none" onsubmit="handleRegisterSubmit(event)">
          <div class="field">
            <label for="register-name">Full Name</label>
            <input id="register-name" type="text" placeholder="Your name" required />
          </div>
          <div class="field">
            <label for="register-email">Email</label>
            <input id="register-email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="field">
            <label for="register-password">Password</label>
            <input id="register-password" type="password" placeholder="Minimum 6 characters" minlength="6" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Create Account</button>
        </form>
        <div class="divider-text">OR</div>
        <button class="google-btn" onclick="handleGoogleSignIn()">🔵 Continue with Google</button>
      </div>
    </div>

    <div class="modal-overlay" id="ai-advisor-modal">
      <div class="modal-box wide">
        <button class="modal-close" onclick="closeModal('ai-advisor-modal')">✕</button>
        <h2 class="modal-title">✨ AI Job Advisor</h2>
        <p class="modal-sub">Tell me your qualification and interest, I'll suggest matching govt jobs</p>
        <div class="field">
          <label for="ai-qualification">Your Qualification</label>
          <select id="ai-qualification">
            <option>10th Pass</option>
            <option>12th Pass</option>
            <option selected>Graduate</option>
            <option>Post Graduate</option>
            <option>Engineering / B.Tech</option>
          </select>
        </div>
        <div class="field">
          <label for="ai-interest">Interest Area</label>
          <select id="ai-interest">
            <option>Banking</option>
            <option>Railways</option>
            <option selected>SSC / Central Govt</option>
            <option>Police / Defence</option>
            <option>Teaching</option>
          </select>
        </div>
        <button class="btn btn-accent btn-block" onclick="runAiAdvisor()">Get Recommendations</button>
        <div id="ai-advisor-results" style="margin-top:16px;"></div>
        <p class="modal-sub" style="margin-top:12px;">
          Note: this demo matches against sample listings on this site. Connect the Anthropic API
          (see comments in script.js → runAiAdvisor) to power this with real AI reasoning across all jobs.
        </p>
      </div>
    </div>`;
}

/* Simple demo matching logic. To make this "real AI":
   call the Anthropic API from here with the user's qualification/interest
   plus the DEMO_JOBS list, and ask Claude to pick + rank the best matches. */
function runAiAdvisor() {
  const qualification = document.getElementById("ai-qualification").value;
  const interest = document.getElementById("ai-interest").value;
  const matches = DEMO_JOBS.filter(
    (j) =>
      j.qualification.toLowerCase().includes(qualification.split(" ")[0].toLowerCase()) ||
      j.orgShort.toLowerCase().includes(interest.split(" ")[0].toLowerCase()) ||
      j.category === "latest-jobs"
  ).slice(0, 3);
  const resultsEl = document.getElementById("ai-advisor-results");
  if (!matches.length) {
    resultsEl.innerHTML = `<p class="modal-sub">No close matches found — check the Latest Jobs tab.</p>`;
    return;
  }
  resultsEl.innerHTML = matches
    .map(
      (j) => `
      <a href="job-detail.html?id=${j.id}" style="display:block; padding:10px 12px; border:1px solid var(--border); border-radius:8px; margin-bottom:8px;">
        <strong style="font-size:13.5px;">${j.title}</strong>
        <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">${j.orgFull} • Last date ${j.lastDate}</div>
      </a>`
    )
    .join("");
}

/* ---------- INIT ON EVERY PAGE ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderTicker();
  renderHeader();
  renderModals();
});
