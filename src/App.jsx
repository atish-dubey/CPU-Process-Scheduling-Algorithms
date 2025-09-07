import React, { useState, createContext, useContext } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import ProcessInput from './components/ProcessInput';
import VisualizationDashboard from './components/VisualizationDashboard';

// Theme Context for dark/light mode
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [currentView, setCurrentView] = useState('selector'); // 'selector', 'input', 'results'
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setCurrentView('input');
    setProcesses([]);
    setResults(null);
  };

  const handleProcessesSubmit = (processData, algorithmResults) => {
    setProcesses(processData);
    setResults(algorithmResults);
    setCurrentView('results');
  };

  const handleBackToSelector = () => {
    setCurrentView('selector');
    setSelectedAlgorithm(null);
    setProcesses([]);
    setResults(null);
  };

  const handleBackToInput = () => {
    setCurrentView('input');
    setResults(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeValue = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        {/* Header */}
        <header className={`shadow-sm border-b transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={handleBackToSelector}
                  className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  CPU Scheduler Visualizer
                </button>
                {currentView !== 'selector' && (
                  <nav className="ml-8 flex space-x-4">
                    <button
                      onClick={handleBackToSelector}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Algorithms
                    </button>
                    {currentView === 'results' && (
                      <button
                        onClick={handleBackToInput}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        Input
                      </button>
                    )}
                  </nav>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'selector' && (
            <AlgorithmSelector onAlgorithmSelect={handleAlgorithmSelect} />
          )}
          {currentView === 'input' && (
            <ProcessInput 
              algorithm={selectedAlgorithm}
              onSubmit={handleProcessesSubmit}
              onBack={handleBackToSelector}
            />
          )}
          {currentView === 'results' && (
            <VisualizationDashboard 
              algorithm={selectedAlgorithm}
              processes={processes}
              results={results}
              onBack={handleBackToInput}
            />
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;