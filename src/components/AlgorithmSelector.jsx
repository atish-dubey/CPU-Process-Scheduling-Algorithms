import React from 'react';
import { useTheme } from '../App';

const algorithms = [
  {
    id: 'fcfs',
    name: 'First Come First Serve (FCFS)',
    description: 'Processes are executed in the order they arrive. Simple and fair, but can cause convoy effect where short processes wait behind long ones. Non-preemptive scheduling algorithm.',
    icon: '📋',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'rr',
    name: 'Round Robin (RR)',
    description: 'Each process gets a fixed time quantum. If not completed, it goes to the back of the queue. Provides good response time and fairness. Time quantum is crucial for performance.',
    icon: '🔄',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'sjf',
    name: 'Shortest Job First (SJF)',
    description: 'Selects the process with the smallest burst time first. Minimizes average waiting time but can cause starvation of longer processes. Non-preemptive version.',
    icon: '⚡',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'srtf',
    name: 'Shortest Remaining Time First (SRTF)',
    description: 'Preemptive version of SJF. If a new process arrives with shorter remaining time, it preempts the current process. Optimal for minimizing average waiting time.',
    icon: '🎯',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'lrtf',
    name: 'Longest Remaining Time First (LRTF)',
    description: 'Preemptive algorithm that selects the process with the longest remaining time. Can cause starvation of shorter processes but ensures longer jobs get priority.',
    icon: '📏',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'ljf',
    name: 'Longest Job First (LJF)',
    description: 'Selects the process with the largest burst time first. Non-preemptive algorithm that prioritizes longer jobs but can significantly delay shorter processes.',
    icon: '🏗️',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const AlgorithmSelector = ({ onAlgorithmSelect }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          CPU Scheduling Algorithms
        </h1>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Visualize and understand how different CPU scheduling algorithms work. 
          Select an algorithm below to start exploring process scheduling behavior.
        </p>
      </div>

      {/* Algorithm Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => (
          <div
            key={algorithm.id}
            onClick={() => onAlgorithmSelect(algorithm)}
            className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Algorithm Icon and Name */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`text-3xl p-3 rounded-lg bg-gradient-to-r ${algorithm.color} text-white`}>
                {algorithm.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-200">
                  {algorithm.name}
                </h3>
              </div>
            </div>

            {/* Algorithm Description */}
            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {algorithm.description}
            </p>

            {/* Action Button */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${algorithm.color} bg-clip-text text-transparent group-hover:underline`}>
                Explore Algorithm
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className={`mt-12 p-6 rounded-xl border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
      }`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-2xl">📊</div>
            <h3 className="font-medium">Interactive Visualization</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              See processes execute in real-time with Gantt charts and timelines
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">📈</div>
            <h3 className="font-medium">Performance Metrics</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Calculate waiting time, turnaround time, and throughput automatically
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">🔄</div>
            <h3 className="font-medium">Algorithm Comparison</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Compare different algorithms with the same process set
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;