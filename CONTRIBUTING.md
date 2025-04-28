# ✨ Contributing to Altitude

Thanks for considering contributing to **Altitude** — a next-generation logistics and touring assistant for artists, managers, and crew!

This document will guide you through setting up, coding standards, and submitting changes.

---

## 🛠 Project Setup

1. Fork the repo (if not already invited)
2. Clone the repo:

```bash
git clone https://github.com/jadenthompson/altitude.git
cd altitude
npm install
npm run dev
```

3. Configure your local environment:
- Request `.env.example`
- Add your own Supabase and OpenAI keys

---

## 🔄 Branching Strategy

- Always work on a **feature branch** off `main`
- Naming format:

```bash
feature/your-feature-name
fix/your-fix-description
```

- Example:

```bash
git checkout -b feature/calendar-animation
```

---

## 🖋 Commit Guidelines

- Clear, descriptive commit messages
- Format:

```bash
type: short description
```

- Examples:
  - `feat: add animated flight widget`
  - `fix: correct guestlist reorder bug`
  - `chore: update README instructions`

---

## ✨ Code Style

- Use **Tailwind CSS** utility-first styling
- Keep the UI **clean, minimalist, Apple-style elegant**
- Animate using **Framer Motion**
- Use **Lucide React** for icons
- Functional components + hooks only (no classes)
- Avoid magic numbers or hardcoded styles when possible
- Keep dark mode responsiveness in mind
- Use async/await properly for all API calls

---

## 📦 Pull Request Process

1. Push your feature branch
2. Open a PR (Pull Request) against `main`
3. Provide a clear PR title and description
4. Tag reviewers if needed
5. Wait for approval before merging

---

## 📜 Important Notes

- Mobile-first and responsive design are priorities
- Respect Supabase real-time updates when adding data flows
- Maintain performance — lightweight components preferred
- Focus on intuitive UX (smooth, beautiful, effortless)

---

# 🚀 Let’s make Altitude the #1 logistics app for artists, globally!
