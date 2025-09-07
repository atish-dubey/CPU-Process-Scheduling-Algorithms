# CPU Process Scheduling Algorithms Visualizer

A comprehensive, interactive web application for visualizing and understanding CPU process scheduling algorithms. Built with React.js, Vite, and TailwindCSS, this educational tool provides real-time visualization of six different scheduling algorithms with detailed performance analysis.

## 🚀 Live Demo

[View Live Application](https://cpu-process-scheduling-algorithms.vercel.app/)

## ✨ Features

### Core Functionality
- **6 CPU Scheduling Algorithms** - Complete implementations with accurate calculations
- **Interactive Gantt Charts** - Visual timeline with hover tooltips and process details
- **Real-time Performance Metrics** - Waiting time, turnaround time, throughput, and CPU utilization
- **Comprehensive Data Tables** - Input processes, results, and performance summaries
- **Algorithm Analysis** - Advantages, disadvantages, and recommendations for each algorithm

### User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Input Validation** - Real-time feedback and error handling
- **Sample Data Generation** - Quick testing with predefined and random datasets
- **Educational Content** - Algorithm explanations and calculation formulas
- **Performance Insights** - Best/worst performing processes and efficiency analysis

### Technical Features
- **Modern React Architecture** - Hooks-based components with clean separation of concerns
- **TypeScript-Ready Structure** - Well-organized codebase for easy migration
- **Optimized Performance** - Efficient rendering and state management
- **Production Ready** - Built and tested for deployment

## 🔧 Supported Algorithms

| Algorithm | Type | Description | Best Use Case |
|-----------|------|-------------|---------------|
| **FCFS** | Non-preemptive | First Come First Serve - processes executed in arrival order | Batch processing systems |
| **Round Robin (RR)** | Preemptive | Time quantum-based fair scheduling | Time-sharing systems |
| **SJF** | Non-preemptive | Shortest Job First - optimal average waiting time | Batch systems with known burst times |
| **SRTF** | Preemptive | Shortest Remaining Time First - preemptive SJF | Real-time systems requiring fast response |
| **LRTF** | Preemptive | Longest Remaining Time First - prioritizes longer processes | Specialized batch processing |
| **LJF** | Non-preemptive | Longest Job First - non-preemptive longest-first | Rarely used in practice |

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- pnpm, npm, or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/atish-dubey/cpu-process-scheduling-algorithms
   cd cpu-process-scheduling-algorithms
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
pnpm run build
# or
npm run build
# or
yarn build
```

## 📖 Usage

### Basic Usage

1. **Select Algorithm**: Choose from 6 available scheduling algorithms on the main page
2. **Configure Processes**: 
   - Add processes with arrival time and burst time
   - Use sample data or generate random data for quick testing
   - Set time quantum for Round Robin algorithm
3. **View Results**: Analyze the interactive Gantt chart, performance metrics, and detailed tables
4. **Compare Performance**: Switch between different tabs to explore various aspects of the results

### Advanced Features

#### Process Configuration
- **Manual Input**: Create custom process sets with specific arrival and burst times
- **Sample Data**: Use predefined datasets for algorithm comparison
- **Random Generation**: Generate random process sets for testing edge cases
- **Validation**: Real-time input validation with helpful error messages

#### Visualization Options
- **Gantt Chart**: Interactive timeline showing process execution order
- **Data Tables**: Comprehensive input/output tables with performance metrics
- **Summary Analysis**: Algorithm characteristics, recommendations, and insights

#### Performance Metrics
- **Average Waiting Time**: Time processes spend waiting in the ready queue
- **Average Turnaround Time**: Total time from arrival to completion
- **Throughput**: Number of processes completed per unit time
- **CPU Utilization**: Percentage of time CPU is actively executing processes

## 📁 Project Structure

```
src/
├── components/
│   ├── AlgorithmSelector.jsx      # Landing page with algorithm cards
│   ├── ProcessInput.jsx           # Process configuration interface
│   ├── VisualizationDashboard.jsx # Results dashboard with tabs
│   ├── GanttChart.jsx            # Interactive Gantt chart component
│   └── ResultsTables.jsx         # Performance tables and metrics
├── utils/
│   └── schedulingAlgorithms.js   # Algorithm implementations
├── App.jsx                       # Main application component
├── main.jsx                      # Application entry point
└── index.css                     # Global styles and Tailwind imports
```

### Key Components

- **App.jsx**: Main application with routing, theme management, and state coordination
- **AlgorithmSelector.jsx**: Interactive algorithm selection with descriptions and features
- **ProcessInput.jsx**: Dynamic process configuration with validation and data generation
- **VisualizationDashboard.jsx**: Comprehensive results display with tabbed interface
- **GanttChart.jsx**: SVG-based interactive timeline visualization
- **ResultsTables.jsx**: Performance metrics, data tables, and analysis
- **schedulingAlgorithms.js**: Core algorithm implementations with helper functions

## 🔬 Algorithm Implementations

### Calculation Formulas

```javascript
// Waiting Time
WT = Start Time - Arrival Time

// Turnaround Time  
TAT = Finish Time - Arrival Time

// Throughput
Throughput = Number of Processes / Total Execution Time

// CPU Utilization
CPU Utilization = (Total Burst Time / Total Time) × 100
```

### Implementation Details

Each algorithm is implemented with:
- **Accurate scheduling logic** following standard operating system principles
- **Gantt chart generation** for visual representation
- **Performance metric calculations** for analysis
- **Edge case handling** for robust operation

### Algorithm Characteristics

| Metric | FCFS | RR | SJF | SRTF | LRTF | LJF |
|--------|------|----|----|------|------|-----|
| **Preemptive** | No | Yes | No | Yes | Yes | No |
| **Starvation** | No | No | Yes | Yes | Yes | Yes |
| **Complexity** | Low | Medium | Medium | High | High | Low |
| **Optimal WT** | No | No | Yes | Yes | No | No |



## 📈 Future Enhancements

- [ ] **Algorithm Comparison Mode** - Side-by-side comparison of multiple algorithms
- [ ] **Export Functionality** - PDF reports and CSV data downloads
- [ ] **Step-by-Step Animation** - Animated algorithm execution walkthrough
- [ ] **Priority Scheduling** - Additional algorithms with priority support
- [ ] **Real-time Simulation** - Live process arrival simulation
- [ ] **Performance Benchmarking** - Algorithm efficiency comparisons
- [ ] **Mobile App** - React Native version for mobile devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Operating System Concepts** by Silberschatz, Galvin, and Gagne
- **React.js Community** for excellent documentation and resources
- **TailwindCSS Team** for the utility-first CSS framework
- **Vite Team** for the fast build tool and development experience

---

**Made with ❤️ for Computer Science Education**

*This project aims to make CPU scheduling algorithms more accessible and understandable through interactive visualization and comprehensive educational content.*