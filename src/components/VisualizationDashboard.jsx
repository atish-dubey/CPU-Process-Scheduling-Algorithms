import React, { useState } from 'react';
import { useTheme } from '../App';
import GanttChart from './GanttChart';
import ResultsTables from './ResultsTables';

const VisualizationDashboard = ({ algorithm, processes, results, onBack }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('gantt');

  const tabs = [
    { id: 'gantt', name: 'Gantt Chart', icon: '📊' },
    { id: 'tables', name: 'Data Tables', icon: '📋' },
    { id: 'summary', name: 'Summary', icon: '📈' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{algorithm.name} Results</h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Visualization and analysis of the {algorithm.name} scheduling algorithm
          </p>
        </div>
        <button
          onClick={onBack}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          ← Back to Input
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-2xl font-bold text-blue-600">{results.summary.averageWaitingTime}</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg Waiting Time
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-2xl font-bold text-green-600">{results.summary.averageTurnaroundTime}</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg Turnaround Time
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-2xl font-bold text-purple-600">{results.summary.throughput}</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Throughput
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-2xl font-bold text-orange-600">{results.summary.cpuUtilization}%</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            CPU Utilization
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : isDarkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'gantt' && (
          <div className="space-y-6">
            <GanttChart 
              ganttData={results.ganttChart} 
              title={`${algorithm.name} - Process Execution Timeline`}
            />
            
            {/* Process Execution Order */}
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-lg font-semibold mb-3">Execution Order</h3>
              <div className="flex flex-wrap gap-2">
                {results.ganttChart
                  .filter(segment => segment.processId !== 'IDLE')
                  .map((segment, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                      style={{ backgroundColor: segment.color + '20', border: `1px solid ${segment.color}` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-sm font-medium">
                        {segment.processId} ({segment.startTime}-{segment.endTime})
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Algorithm Explanation */}
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
            }`}>
              <h3 className="text-lg font-semibold mb-2">How {algorithm.name} Works</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {algorithm.description}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <ResultsTables 
            processes={processes}
            results={results.results}
            summary={results.summary}
          />
        )}

        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Performance Comparison */}
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Waiting Time Analysis */}
                <div>
                  <h4 className="font-medium mb-3">Waiting Time Distribution</h4>
                  <div className="space-y-2">
                    {results.results.map((result) => (
                      <div key={result.id} className="flex items-center justify-between">
                        <span className="text-sm">{result.id}</span>
                        <div className="flex items-center space-x-2">
                          <div className={`h-2 rounded-full ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`} style={{ width: '100px' }}>
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{
                                width: `${Math.min((result.waitingTime / Math.max(...results.results.map(r => r.waitingTime))) * 100, 100)}%`
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{result.waitingTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Turnaround Time Analysis */}
                <div>
                  <h4 className="font-medium mb-3">Turnaround Time Distribution</h4>
                  <div className="space-y-2">
                    {results.results.map((result) => (
                      <div key={result.id} className="flex items-center justify-between">
                        <span className="text-sm">{result.id}</span>
                        <div className="flex items-center space-x-2">
                          <div className={`h-2 rounded-full ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`} style={{ width: '100px' }}>
                            <div
                              className="h-2 rounded-full bg-green-500"
                              style={{
                                width: `${Math.min((result.turnaroundTime / Math.max(...results.results.map(r => r.turnaroundTime))) * 100, 100)}%`
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{result.turnaroundTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Algorithm Characteristics */}
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">Algorithm Characteristics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Advantages</h4>
                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getAlgorithmAdvantages(algorithm.id).map((advantage, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Disadvantages</h4>
                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getAlgorithmDisadvantages(algorithm.id).map((disadvantage, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-yellow-50 border-yellow-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {getAlgorithmRecommendations(algorithm.id, results.summary)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions for algorithm characteristics
const getAlgorithmAdvantages = (algorithmId) => {
  const advantages = {
    fcfs: [
      'Simple to understand and implement',
      'No starvation - every process gets executed',
      'Fair in terms of arrival order',
      'Low overhead'
    ],
    rr: [
      'Good response time for interactive systems',
      'Fair allocation of CPU time',
      'No starvation',
      'Works well for time-sharing systems'
    ],
    sjf: [
      'Minimizes average waiting time',
      'Optimal for batch systems',
      'Good throughput',
      'Efficient for known burst times'
    ],
    srtf: [
      'Optimal average waiting time',
      'Good response time for short processes',
      'Preemptive nature allows better resource utilization',
      'Suitable for real-time systems'
    ],
    lrtf: [
      'Ensures longer processes get priority',
      'Good for batch processing systems',
      'Prevents short processes from dominating',
      'Useful when longer jobs are more important'
    ],
    ljf: [
      'Simple non-preemptive approach',
      'Good for systems where longer jobs have priority',
      'Low context switching overhead',
      'Suitable for batch processing'
    ]
  };
  return advantages[algorithmId] || [];
};

const getAlgorithmDisadvantages = (algorithmId) => {
  const disadvantages = {
    fcfs: [
      'Convoy effect - short processes wait for long ones',
      'Poor response time',
      'Not suitable for interactive systems',
      'Average waiting time can be high'
    ],
    rr: [
      'Performance depends heavily on time quantum',
      'Higher context switching overhead',
      'Not optimal for varying burst times',
      'Can lead to higher turnaround time'
    ],
    sjf: [
      'Starvation of longer processes',
      'Difficult to predict burst times',
      'Not suitable for interactive systems',
      'Can lead to unfairness'
    ],
    srtf: [
      'High context switching overhead',
      'Starvation of longer processes',
      'Complex implementation',
      'Requires accurate burst time prediction'
    ],
    lrtf: [
      'Starvation of shorter processes',
      'Poor response time for short tasks',
      'High context switching overhead',
      'Not suitable for interactive systems'
    ],
    ljf: [
      'Severe starvation of short processes',
      'Very poor response time',
      'Not suitable for most practical systems',
      'Can lead to system inefficiency'
    ]
  };
  return disadvantages[algorithmId] || [];
};

const getAlgorithmRecommendations = (algorithmId, summary) => {
  const recommendations = {
    fcfs: `FCFS is best suited for batch processing systems where simplicity is preferred over performance. 
           With an average waiting time of ${summary.averageWaitingTime}, consider using this algorithm when 
           process arrival order is important and system overhead should be minimal.`,
    
    rr: `Round Robin works well for time-sharing systems. With ${summary.cpuUtilization}% CPU utilization, 
         consider adjusting the time quantum if context switching overhead is too high. 
         Optimal for interactive systems requiring good response time.`,
    
    sjf: `SJF provides optimal average waiting time (${summary.averageWaitingTime}) for batch systems. 
          Best used when burst times are known in advance and starvation of longer processes is acceptable.`,
    
    srtf: `SRTF offers the best average waiting time but with higher overhead. With ${summary.throughput} throughput, 
           it's suitable for real-time systems where response time is critical.`,
    
    lrtf: `LRTF prioritizes longer processes, which may not be suitable for most interactive systems. 
           Consider this algorithm only when longer jobs have higher priority in your system.`,
    
    ljf: `LJF can cause severe starvation and is rarely used in practice. 
          Only consider this algorithm in specialized scenarios where longest jobs must be completed first.`
  };
  
  return recommendations[algorithmId] || 'No specific recommendations available for this algorithm.';
};

export default VisualizationDashboard;