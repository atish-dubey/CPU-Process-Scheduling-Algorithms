import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { runSchedulingAlgorithm } from '../utils/schedulingAlgorithms';

const ProcessInput = ({ algorithm, onSubmit, onBack }) => {
  const { isDarkMode } = useTheme();
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5 },
    { id: 'P2', arrivalTime: 1, burstTime: 3 },
    { id: 'P3', arrivalTime: 2, burstTime: 8 }
  ]);
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    
    // Check for duplicate process IDs
    const ids = processes.map(p => p.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      newErrors.duplicate = `Duplicate process IDs: ${duplicateIds.join(', ')}`;
    }

    // Validate each process
    processes.forEach((process, index) => {
      if (!process.id.trim()) {
        newErrors[`id_${index}`] = 'Process ID is required';
      }
      if (process.arrivalTime < 0) {
        newErrors[`arrival_${index}`] = 'Arrival time cannot be negative';
      }
      if (process.burstTime <= 0) {
        newErrors[`burst_${index}`] = 'Burst time must be positive';
      }
    });

    // Validate time quantum for Round Robin
    if (algorithm.id === 'rr' && timeQuantum <= 0) {
      newErrors.timeQuantum = 'Time quantum must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProcessChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index] = {
      ...newProcesses[index],
      [field]: field === 'id' ? value : Number(value)
    };
    setProcesses(newProcesses);
  };

  const addProcess = () => {
    if (processes.length < 10) {
      const newId = `P${processes.length + 1}`;
      setProcesses([...processes, { id: newId, arrivalTime: 0, burstTime: 1 }]);
    }
  };

  const removeProcess = (index) => {
    if (processes.length > 2) {
      const newProcesses = processes.filter((_, i) => i !== index);
      setProcesses(newProcesses);
    }
  };

  const generateSampleData = () => {
    const sampleProcesses = [
      { id: 'P1', arrivalTime: 0, burstTime: 8 },
      { id: 'P2', arrivalTime: 1, burstTime: 4 },
      { id: 'P3', arrivalTime: 2, burstTime: 9 },
      { id: 'P4', arrivalTime: 3, burstTime: 5 }
    ];
    setProcesses(sampleProcesses);
  };

  const generateRandomData = () => {
    const numProcesses = Math.floor(Math.random() * 4) + 3; // 3-6 processes
    const randomProcesses = [];
    
    for (let i = 0; i < numProcesses; i++) {
      randomProcesses.push({
        id: `P${i + 1}`,
        arrivalTime: Math.floor(Math.random() * 5), // 0-4
        burstTime: Math.floor(Math.random() * 10) + 1 // 1-10
      });
    }
    
    setProcesses(randomProcesses);
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const results = runSchedulingAlgorithm(algorithm, processes, timeQuantum);
      onSubmit(processes, results);
    } catch (error) {
      setErrors({ general: `Error running algorithm: ${error.message}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{algorithm.name}</h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Configure processes for the {algorithm.name} scheduling algorithm
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
          ← Back to Algorithms
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Process Configuration */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Process Configuration</h2>
            <div className="flex space-x-2">
              <button
                onClick={generateSampleData}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Sample Data
              </button>
              <button
                onClick={generateRandomData}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Random Data
              </button>
            </div>
          </div>

          {/* Time Quantum for Round Robin */}
          {algorithm.id === 'rr' && (
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
            }`}>
              <label className="block text-sm font-medium mb-2">
                Time Quantum
              </label>
              <input
                type="number"
                min="1"
                value={timeQuantum}
                onChange={(e) => setTimeQuantum(Number(e.target.value))}
                className={`w-24 px-3 py-2 rounded-md border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } ${errors.timeQuantum ? 'border-red-500' : ''}`}
              />
              {errors.timeQuantum && (
                <p className="mt-1 text-sm text-red-500">{errors.timeQuantum}</p>
              )}
            </div>
          )}

          {/* Process Table */}
          <div className={`rounded-lg border overflow-hidden ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Process ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Arrival Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Burst Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {processes.map((process, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={process.id}
                          onChange={(e) => handleProcessChange(index, 'id', e.target.value)}
                          className={`w-full px-2 py-1 rounded border transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors[`id_${index}`] ? 'border-red-500' : ''}`}
                        />
                        {errors[`id_${index}`] && (
                          <p className="mt-1 text-xs text-red-500">{errors[`id_${index}`]}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={process.arrivalTime}
                          onChange={(e) => handleProcessChange(index, 'arrivalTime', e.target.value)}
                          className={`w-full px-2 py-1 rounded border transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors[`arrival_${index}`] ? 'border-red-500' : ''}`}
                        />
                        {errors[`arrival_${index}`] && (
                          <p className="mt-1 text-xs text-red-500">{errors[`arrival_${index}`]}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={process.burstTime}
                          onChange={(e) => handleProcessChange(index, 'burstTime', e.target.value)}
                          className={`w-full px-2 py-1 rounded border transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors[`burst_${index}`] ? 'border-red-500' : ''}`}
                        />
                        {errors[`burst_${index}`] && (
                          <p className="mt-1 text-xs text-red-500">{errors[`burst_${index}`]}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeProcess(index)}
                          disabled={processes.length <= 2}
                          className={`p-1 rounded transition-colors duration-200 ${
                            processes.length <= 2
                              ? 'text-gray-400 cursor-not-allowed'
                              : isDarkMode 
                                ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' 
                                : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                          }`}
                          title={processes.length <= 2 ? 'Minimum 2 processes required' : 'Remove process'}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Process Button */}
            <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={addProcess}
                disabled={processes.length >= 10}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                  processes.length >= 10
                    ? 'text-gray-400 cursor-not-allowed'
                    : isDarkMode 
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' 
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
                title={processes.length >= 10 ? 'Maximum 10 processes allowed' : 'Add new process'}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Process</span>
              </button>
            </div>
          </div>

          {/* Error Messages */}
          {(errors.duplicate || errors.general) && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
              {errors.duplicate && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.duplicate}</p>
              )}
              {errors.general && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
              )}
            </div>
          )}
        </div>

        {/* Algorithm Info & Submit */}
        <div className="space-y-4">
          {/* Algorithm Description */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="font-semibold mb-2">{algorithm.name}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {algorithm.description}
            </p>
          </div>

          {/* Process Summary */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="font-semibold mb-2">Process Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Processes:</span>
                <span className="font-medium">{processes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Burst Time:</span>
                <span className="font-medium">
                  {processes.reduce((sum, p) => sum + p.burstTime, 0)} units
                </span>
              </div>
              <div className="flex justify-between">
                <span>Earliest Arrival:</span>
                <span className="font-medium">
                  {Math.min(...processes.map(p => p.arrivalTime))} units
                </span>
              </div>
              <div className="flex justify-between">
                <span>Latest Arrival:</span>
                <span className="font-medium">
                  {Math.max(...processes.map(p => p.arrivalTime))} units
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } hover:shadow-lg transform hover:scale-105`}
          >
            Run {algorithm.name} Algorithm
          </button>

          {/* Help Text */}
          <div className={`p-3 rounded-lg text-xs ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            <p className="font-medium mb-1">Tips:</p>
            <ul className="space-y-1">
              <li>• Process IDs must be unique</li>
              <li>• Arrival time ≥ 0, Burst time &gt; 0</li>
              <li>• Use "Sample Data" for quick testing</li>
              <li>• Maximum 10 processes allowed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessInput;