# ⚡ Sorti<span style="color:#8B5CF6">fy</span>

<div align="center">

![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)

<p align="center">
  <strong>An intuitive, interactive sorting algorithm visualizer and computer science exam companion.</strong>
  <br />
  Master algorithmic thinking with step-by-step visualizations, synced pseudocode execution, interactive practice tests, and exam cheat sheets.
</p>

[Explore Visualizer](#-features) • [Quick Start](#-getting-started) • [Algorithms](#-algorithms-included) • [Terminal Easter Egg](#-developer-terminal) • [Tech Stack](#-tech-stack)

</div>

---

## 🌟 Highlights

- **🎯 Interactive Step-by-Step Visualization**: Play, pause, step forward, and step backward through sorting algorithms with live element tracking.
- **🎨 State-Based Color Semantics**:
  - 🟡 **Comparing**: Amber Yellow (`#F59E0B`)
  - 🔴 **Swapping**: Vibrant Red (`#EF4444`)
  - 🟣 **Pivot / Key**: Electric Violet (`#8B5CF6`)
  - 🟢 **Locked in Place (Sorted)**: Emerald Green (`#22C55E`)
- **📜 Synced Pseudocode Tracking**: Highlights the active line of code in real time as each comparison and swap takes place.
- **📊 Real-Time Metrics & Telemetry**: Live counters for total comparisons, array writes/swaps, current step progress, and array size.
- **🎛️ Dynamic Controls**:
  - Speed adjustment from **30ms** (hyper-fast) to **800ms** (deep trace)
  - Custom dataset input (e.g. `9, 2, 7, 4, 1, 8`)
  - Array size slider (5 to 30 items) and min/max value range controls
  - Multiple motion modes: `Normal`, `Subtle`, and `Instant`
- **🧠 Exam Practice & Quiz Mode**: Test your algorithm tracing skills with auto-generated questions, step-by-step explanations, and interactive score tracking.
- **📚 Comprehensive CS Cheat Sheet**: Complete breakdown of Big-O time (Best, Average, Worst), space complexity, stability, in-place classification, and production-grade Python implementations.
- **📱 100% Responsive & Device-Adaptive**: Custom-engineered layout with fluid typography and touch inertia, running smoothly across smartphones, tablets, laptops, and ultra-wide displays.
- **💻 Developer Terminal Easter Egg**: Integrated terminal modal featuring retro typing animations and credit logs.

---

## 🚀 Algorithms Included

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | Method |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Bubble Sort** | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ Yes | Exchanging |
| **Selection Sort** | $\Omega(n^2)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ | ❌ No | Selection |
| **Insertion Sort** | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ Yes | Insertion |
| **Merge Sort** | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(n)$ | ✅ Yes | Divide & Conquer |
| **Quick Sort** | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n^2)$ | $O(\log n)$ | ❌ No | Partitioning |
| **Heap Sort** | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(1)$ | ❌ No | Selection (Heap) |

---

## ⌨️ Developer Terminal (Easter Egg)

Sortify includes a hidden developer terminal with live typing animation effects:

- **Desktop & Laptop**:
  - Open terminal: `Shift + S`
  - Close terminal: `Shift + D` (or `Esc`)
- **Mobile & Tablet**:
  - Touch and hold the **Sortify** brand logo in the top bar for **3 seconds** to open.
  - Tap the exit icon (`✕`) or tap anywhere outside the modal to close.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript 7](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/), [ESBuild](https://esbuild.github.io/)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.0.0` or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sortify.git
   cd sortify
Install dependencies:
code
Bash
npm install
Start the development server:
code
Bash
npm run dev
Open http://localhost:3000 in your browser.
Build for production:
code
Bash
npm run build
Preview production build:
code
Bash
npm run preview
📁 Project Structure
code
Text
sortify/
├── public/                 # Static assets & icons
├── src/
│   ├── algorithms/         # Sorting generators & step-by-step tracers
│   │   ├── bubbleSort.ts
│   │   ├── selectionSort.ts
│   │   ├── insertionSort.ts
│   │   ├── mergeSort.ts
│   │   ├── quickSort.ts
│   │   ├── heapSort.ts
│   │   └── definitions.ts
│   ├── components/
│   │   ├── Learn/          # Cheat sheets & exam guides
│   │   ├── Practice/       # Interactive quiz & problem engine
│   │   ├── Visualizer/     # Bar charts, controls & pseudocode
│   │   ├── DeveloperTerminal.tsx
│   │   ├── Navbar.tsx
│   │   ├── SortifyRobot.tsx
│   │   └── SplashScreen.tsx
│   ├── utils/              # Array generators & math helpers
│   ├── types.ts            # TypeScript interfaces & definitions
│   ├── App.tsx             # Root layout & keyboard listener
│   ├── main.tsx            # Application entry point
│   └── index.css           # Tailwind CSS directives & animations
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
🤝 Contributing
Contributions are always welcome! If you have suggestions for new sorting algorithms (e.g., Radix Sort, Tim Sort) or educational visualizations:
Fork the Project
Create your Feature Branch (git checkout -b feature/AlgorithmName)
Commit your Changes (git commit -m 'Add AlgorithmName visualizer')
Push to the Branch (git push origin feature/AlgorithmName)
Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE for more information.
<div align="center">
<sub>Developed by <strong>Subhajit Datta</strong> • Built with ❤️ for computer science learners worldwide</sub>
</div>
```
