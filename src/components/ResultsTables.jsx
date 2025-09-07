import React from 'react';
import { useTheme } from '../App';

const ResultsTables = ({ processes, results, summary }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* Input Processes Table */}
      <div className={`rounded-lg border overflow-hidden ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
          <h3 className="text-lg font-semibold">Input Processes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Process ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Arrival Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Burst Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {processes.map((process, index) => (
                <tr key={process.id} className={index % 2 === 0 ? (isDarkMode ? 'bg-gray-800' : 'bg-white') : (isDarkMode ? 'bg-gray-750' : 'bg-gray-50')}>
                  <td className="px-4 py-3 font-medium">{process.id}</td>
                  <td className="px-4 py-3">{process.arrivalTime}</td>
                  <td className="px-4 py-3">{process.burstTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Table */}
      <div className={`rounded-lg border overflow-hidden ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
          <h3 className="text-lg font-semibold">Scheduling Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Process ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Arrival Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Burst Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Start Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Finish Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Waiting Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Turnaround Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result, index) => (
                <tr key={result.id} className={index % 2 === 0 ? (isDarkMode ? 'bg-gray-800' : 'bg-white') : (isDarkMode ? 'bg-gray-750' : 'bg-gray-50')}>
                  <td className="px-4 py-3 font-medium">{result.id}</td>
                  <td className="px-4 py-3">{result.arrivalTime}</td>
                  <td className="px-4 py-3">{result.burstTime}</td>
                  <td className="px-4 py-3">{result.startTime}</td>
                  <td className="px-4 py-3">{result.finishTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      result.waitingTime === 0 
                        ? (isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                        : result.waitingTime > 10
                        ? (isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800')
                        : (isDarkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                    }`}>
                      {result.waitingTime}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      result.turnaroundTime <= result.burstTime * 1.5
                        ? (isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                        : result.turnaroundTime > result.burstTime * 3
                        ? (isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800')
                        : (isDarkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                    }`}>
                      {result.turnaroundTime}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className={`rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
          <h3 className="text-lg font-semibold">Performance Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Average Waiting Time */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
                    Average Waiting Time
                  </p>
                  <p className="text-2xl font-bold">
                    {summary.averageWaitingTime}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`}>
                    time units
                  </p>
                </div>
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Average Turnaround Time */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-green-600'}`}>
                    Average Turnaround Time
                  </p>
                  <p className="text-2xl font-bold">
                    {summary.averageTurnaroundTime}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-green-500'}`}>
                    time units
                  </p>
                </div>
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-green-600' : 'bg-green-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Throughput */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-purple-600'}`}>
                    Throughput
                  </p>
                  <p className="text-2xl font-bold">
                    {summary.throughput}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-purple-500'}`}>
                    processes/unit
                  </p>
                </div>
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-purple-600' : 'bg-purple-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CPU Utilization */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-orange-600'}`}>
                    CPU Utilization
                  </p>
                  <p className="text-2xl font-bold">
                    {summary.cpuUtilization}%
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-orange-500'}`}>
                    efficiency
                  </p>
                </div>
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-orange-600' : 'bg-orange-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-orange-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-2">Performance Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Best Performing Process:</span>
                <span className="ml-2">
                  {results.reduce((best, current) => 
                    current.waitingTime < best.waitingTime ? current : best
                  ).id} (Waiting Time: {results.reduce((best, current) => 
                    current.waitingTime < best.waitingTime ? current : best
                  ).waitingTime})
                </span>
              </div>
              <div>
                <span className="font-medium">Worst Performing Process:</span>
                <span className="ml-2">
                  {results.reduce((worst, current) => 
                    current.waitingTime > worst.waitingTime ? current : worst
                  ).id} (Waiting Time: {results.reduce((worst, current) => 
                    current.waitingTime > worst.waitingTime ? current : worst
                  ).waitingTime})
                </span>
              </div>
              <div>
                <span className="font-medium">Total Execution Time:</span>
                <span className="ml-2">
                  {Math.max(...results.map(r => r.finishTime))} time units
                </span>
              </div>
              <div>
                <span className="font-medium">Average Response Ratio:</span>
                <span className="ml-2">
                  {(results.reduce((sum, r) => sum + (r.turnaroundTime / r.burstTime), 0) / results.length).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulas Reference */}
      <div className={`rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
          <h3 className="text-lg font-semibold">Calculation Formulas</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-medium mb-1">Waiting Time</div>
              <div className="font-mono text-xs">WT = Start Time - Arrival Time</div>
            </div>
            <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-medium mb-1">Turnaround Time</div>
              <div className="font-mono text-xs">TAT = Finish Time - Arrival Time</div>
            </div>
            <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-medium mb-1">Throughput</div>
              <div className="font-mono text-xs">TP = Number of Processes / Total Time</div>
            </div>
            <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-medium mb-1">CPU Utilization</div>
              <div className="font-mono text-xs">CPU% = (Total Burst Time / Total Time) × 100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTables;