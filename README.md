# 🍊 Vitamin Resume & Cover

> **Free Resume & Cover Letter Builder**  
> Privacy-focused • Open-source • No account required

Forked and enhanced from [OpenResume](https://github.com/xitanggg/open-resume)

---

## ✨ Features

### Current
- 📄 **Multi-page PDF preview** - See your full resume instantly
- 🌍 **Languages section** - Rate your language proficiency
- 🎯 **Smart page breaks** - Content doesn't split awkwardly between pages
- 🎨 **Enhanced styling** - Better section spacing and typography
- 🔒 **100% Private** - All data stays in your browser (localStorage)
- 📥 **Import/Export** - Parse existing PDFs or download as JSON

### Original Features (from OpenResume)
- Professional resume builder with live preview
- ATS-friendly templates
- Multiple sections: Work, Education, Projects, Skills, Custom
- Theme customization
- Font selection
- Bullet point management

---

## 🎯 Roadmap & Milestone

### 📋 Phase 1: Multi-Resume Management (In Progress)
**Goal:** Save and manage multiple resume versions

- [ ] Data structure for multiple resumes
- [ ] Resume version selector UI
- [ ] Create/duplicate/delete versions
- [ ] Metadata: version name, language, date modified
- [ ] Dashboard to manage all versions
- [ ] Individual import/export per version

**Use cases:** Different languages, tailored for specific jobs, industry variants

---

### 🎨 Phase 2: Template System (Planned)
**Goal:** Multiple design templates to choose from

- [ ] Template architecture and common interface
- [ ] Template #1: "Classic" (current design refactored)
- [ ] Template #2: "Modern" (sidebar + main content layout)
- [ ] Template selector in settings
- [ ] Side-by-side template preview

**Benefit:** Professional variety while maintaining ATS compatibility

---

### ✉️ Phase 3: Cover Letter Feature (Planned)
**Goal:** Complete cover letter builder integrated with resumes

- [ ] Cover letter data structure in Redux
- [ ] Simple form: recipient, company, position, body, signature
- [ ] Rich text editor for letter body
- [ ] PDF rendering for cover letters
- [ ] Link cover letters to specific resume versions
- [ ] Combined download (Resume + Cover Letter)
- [ ] Template paragraphs library (optional)

**Benefit:** Complete job application package in one tool

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ferranespel/Vitamin-resume-cover.git
cd Vitamin-resume-cover

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **PDF Generation:** @react-pdf/renderer
- **Icons:** Heroicons
- **Language:** TypeScript

---

## 📁 Project Structure
```
src/app/
├── components/
│   ├── Resume/          # Resume preview and PDF components
│   ├── ResumeForm/      # Form components for editing
│   └── fonts/           # Font management
├── lib/
│   ├── redux/           # State management
│   └── parse-resume-from-pdf/  # PDF import parser
└── home/                # Landing page
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow existing code style
- Test on multiple browsers
- Ensure PDF export works correctly
- Update README for new features

---

## 📜 License

**AGPLv3** - Same as the original OpenResume project

This means:
- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ⚠️ Must keep same license
- ⚠️ Must disclose source code
- ⚠️ Must document changes

---

## 🙏 Credits

This project is built upon the excellent work of:
- **[OpenResume](https://github.com/xitanggg/open-resume)** by [xitanggg](https://github.com/xitanggg)

### Enhancements by Vitamin Resume & Cover
- Multi-page PDF viewer integration
- Improved page break handling
- Languages section with proficiency ratings
- Enhanced section styling
- Roadmap for multi-resume and cover letter features

---

## 💡 Why "Vitamin"?

Essential nutrition for your career! 🍊 Just like vitamins boost your health, this tool boosts your job applications.

---

## 🐛 Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/ferranespel/Vitamin-resume-cover/issues)

---

## 📧 Contact

Created by [@ferranespel](https://github.com/ferranespel)  
LinkedIn: [ferranespel](https://www.linkedin.com/in/ferranespel/)

---

**Star ⭐ this repo if you find it helpful!**