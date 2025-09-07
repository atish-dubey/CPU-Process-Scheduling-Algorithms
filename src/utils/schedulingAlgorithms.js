// CPU Scheduling Algorithms Implementation

export const runSchedulingAlgorithm = (algorithm, processes, timeQuantum = 2) => {
  // Sort processes by arrival time initially
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  switch (algorithm.id) {
    case 'fcfs':
      return runFCFS(sortedProcesses);
    case 'rr':
      return runRoundRobin(sortedProcesses, timeQuantum);
    case 'sjf':
      return runSJF(sortedProcesses);
    case 'srtf':
      return runSRTF(sortedProcesses);
    case 'lrtf':
      return runLRTF(sortedProcesses);
    case 'ljf':
      return runLJF(sortedProcesses);
    default:
      throw new Error(`Unknown algorithm: ${algorithm.id}`);
  }
};

// First Come First Serve (FCFS)
const runFCFS = (processes) => {
  let currentTime = 0;
  const ganttChart = [];
  const results = [];

  processes.forEach((process) => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const finishTime = startTime + process.burstTime;
    const waitingTime = startTime - process.arrivalTime;
    const turnaroundTime = finishTime - process.arrivalTime;

    // Add idle time if needed
    if (currentTime < process.arrivalTime) {
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: process.arrivalTime,
        color: '#e5e7eb'
      });
    }

    ganttChart.push({
      processId: process.id,
      startTime,
      endTime: finishTime,
      color: getProcessColor(process.id)
    });

    results.push({
      ...process,
      startTime,
      finishTime,
      waitingTime,
      turnaroundTime
    });

    currentTime = finishTime;
  });

  return {
    ganttChart,
    results,
    summary: calculateSummary(results)
  };
};

// Round Robin (RR)
const runRoundRobin = (processes, timeQuantum) => {
  const ganttChart = [];
  const results = [];
  const queue = [];
  let currentTime = 0;
  let processIndex = 0;

  // Initialize remaining times
  const remainingTimes = {};
  const startTimes = {};
  processes.forEach(p => {
    remainingTimes[p.id] = p.burstTime;
  });

  while (processIndex < processes.length || queue.length > 0) {
    // Add newly arrived processes to queue
    while (processIndex < processes.length && processes[processIndex].arrivalTime <= currentTime) {
      queue.push(processes[processIndex]);
      processIndex++;
    }

    if (queue.length === 0) {
      // No process available, advance time to next arrival
      if (processIndex < processes.length) {
        ganttChart.push({
          processId: 'IDLE',
          startTime: currentTime,
          endTime: processes[processIndex].arrivalTime,
          color: '#e5e7eb'
        });
        currentTime = processes[processIndex].arrivalTime;
      }
      continue;
    }

    const currentProcess = queue.shift();
    const executionTime = Math.min(timeQuantum, remainingTimes[currentProcess.id]);

    // Record start time for first execution
    if (!(currentProcess.id in startTimes)) {
      startTimes[currentProcess.id] = currentTime;
    }

    ganttChart.push({
      processId: currentProcess.id,
      startTime: currentTime,
      endTime: currentTime + executionTime,
      color: getProcessColor(currentProcess.id)
    });

    currentTime += executionTime;
    remainingTimes[currentProcess.id] -= executionTime;

    // Add newly arrived processes during execution
    while (processIndex < processes.length && processes[processIndex].arrivalTime <= currentTime) {
      queue.push(processes[processIndex]);
      processIndex++;
    }

    // If process not finished, add back to queue
    if (remainingTimes[currentProcess.id] > 0) {
      queue.push(currentProcess);
    } else {
      // Process finished
      const finishTime = currentTime;
      const waitingTime = finishTime - currentProcess.arrivalTime - currentProcess.burstTime;
      const turnaroundTime = finishTime - currentProcess.arrivalTime;

      results.push({
        ...currentProcess,
        startTime: startTimes[currentProcess.id],
        finishTime,
        waitingTime,
        turnaroundTime
      });
    }
  }

  // Sort results by process ID for consistent display
  results.sort((a, b) => a.id.localeCompare(b.id));

  return {
    ganttChart,
    results,
    summary: calculateSummary(results)
  };
};

// Shortest Job First (SJF) - Non-preemptive
const runSJF = (processes) => {
  const ganttChart = [];
  const results = [];
  const completed = new Set();
  let currentTime = 0;

  while (completed.size < processes.length) {
    // Find available processes (arrived and not completed)
    const available = processes.filter(p => 
      p.arrivalTime <= currentTime && !completed.has(p.id)
    );

    if (available.length === 0) {
      // No process available, advance to next arrival
      const nextArrival = Math.min(...processes
        .filter(p => !completed.has(p.id))
        .map(p => p.arrivalTime)
      );
      
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        color: '#e5e7eb'
      });
      currentTime = nextArrival;
      continue;
    }

    // Select process with shortest burst time
    const selectedProcess = available.reduce((shortest, current) => 
      current.burstTime < shortest.burstTime ? current : shortest
    );

    const startTime = currentTime;
    const finishTime = startTime + selectedProcess.burstTime;
    const waitingTime = startTime - selectedProcess.arrivalTime;
    const turnaroundTime = finishTime - selectedProcess.arrivalTime;

    ganttChart.push({
      processId: selectedProcess.id,
      startTime,
      endTime: finishTime,
      color: getProcessColor(selectedProcess.id)
    });

    results.push({
      ...selectedProcess,
      startTime,
      finishTime,
      waitingTime,
      turnaroundTime
    });

    completed.add(selectedProcess.id);
    currentTime = finishTime;
  }

  return {
    ganttChart,
    results,
    summary: calculateSummary(results)
  };
};

// Shortest Remaining Time First (SRTF) - Preemptive
const runSRTF = (processes) => {
  const ganttChart = [];
  const results = [];
  const remainingTimes = {};
  const startTimes = {};
  let currentTime = 0;

  // Initialize remaining times
  processes.forEach(p => {
    remainingTimes[p.id] = p.burstTime;
  });

  while (Object.values(remainingTimes).some(time => time > 0)) {
    // Get available processes
    const available = processes.filter(p => 
      p.arrivalTime <= currentTime && remainingTimes[p.id] > 0
    );

    if (available.length === 0) {
      // No process available, advance to next arrival
      const nextArrival = Math.min(...processes
        .filter(p => remainingTimes[p.id] > 0)
        .map(p => p.arrivalTime)
      );
      
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        color: '#e5e7eb'
      });
      currentTime = nextArrival;
      continue;
    }

    // Select process with shortest remaining time
    const selectedProcess = available.reduce((shortest, current) => 
      remainingTimes[current.id] < remainingTimes[shortest.id] ? current : shortest
    );

    // Record start time for first execution
    if (!(selectedProcess.id in startTimes)) {
      startTimes[selectedProcess.id] = currentTime;
    }

    // Execute for 1 time unit (to check for preemption)
    const executionTime = 1;

    ganttChart.push({
      processId: selectedProcess.id,
      startTime: currentTime,
      endTime: currentTime + executionTime,
      color: getProcessColor(selectedProcess.id)
    });

    currentTime += executionTime;
    remainingTimes[selectedProcess.id] -= executionTime;

    // If process finished
    if (remainingTimes[selectedProcess.id] === 0) {
      const finishTime = currentTime;
      const waitingTime = finishTime - selectedProcess.arrivalTime - selectedProcess.burstTime;
      const turnaroundTime = finishTime - selectedProcess.arrivalTime;

      results.push({
        ...selectedProcess,
        startTime: startTimes[selectedProcess.id],
        finishTime,
        waitingTime,
        turnaroundTime
      });
    }
  }

  // Merge consecutive executions of same process
  const mergedGantt = mergeConsecutiveExecutions(ganttChart);

  // Sort results by process ID
  results.sort((a, b) => a.id.localeCompare(b.id));

  return {
    ganttChart: mergedGantt,
    results,
    summary: calculateSummary(results)
  };
};

// Longest Remaining Time First (LRTF) - Preemptive
const runLRTF = (processes) => {
  const ganttChart = [];
  const results = [];
  const remainingTimes = {};
  const startTimes = {};
  let currentTime = 0;

  // Initialize remaining times
  processes.forEach(p => {
    remainingTimes[p.id] = p.burstTime;
  });

  while (Object.values(remainingTimes).some(time => time > 0)) {
    // Get available processes
    const available = processes.filter(p => 
      p.arrivalTime <= currentTime && remainingTimes[p.id] > 0
    );

    if (available.length === 0) {
      // No process available, advance to next arrival
      const nextArrival = Math.min(...processes
        .filter(p => remainingTimes[p.id] > 0)
        .map(p => p.arrivalTime)
      );
      
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        color: '#e5e7eb'
      });
      currentTime = nextArrival;
      continue;
    }

    // Select process with longest remaining time
    const selectedProcess = available.reduce((longest, current) => 
      remainingTimes[current.id] > remainingTimes[longest.id] ? current : longest
    );

    // Record start time for first execution
    if (!(selectedProcess.id in startTimes)) {
      startTimes[selectedProcess.id] = currentTime;
    }

    // Execute for 1 time unit (to check for preemption)
    const executionTime = 1;

    ganttChart.push({
      processId: selectedProcess.id,
      startTime: currentTime,
      endTime: currentTime + executionTime,
      color: getProcessColor(selectedProcess.id)
    });

    currentTime += executionTime;
    remainingTimes[selectedProcess.id] -= executionTime;

    // If process finished
    if (remainingTimes[selectedProcess.id] === 0) {
      const finishTime = currentTime;
      const waitingTime = finishTime - selectedProcess.arrivalTime - selectedProcess.burstTime;
      const turnaroundTime = finishTime - selectedProcess.arrivalTime;

      results.push({
        ...selectedProcess,
        startTime: startTimes[selectedProcess.id],
        finishTime,
        waitingTime,
        turnaroundTime
      });
    }
  }

  // Merge consecutive executions of same process
  const mergedGantt = mergeConsecutiveExecutions(ganttChart);

  // Sort results by process ID
  results.sort((a, b) => a.id.localeCompare(b.id));

  return {
    ganttChart: mergedGantt,
    results,
    summary: calculateSummary(results)
  };
};

// Longest Job First (LJF) - Non-preemptive
const runLJF = (processes) => {
  const ganttChart = [];
  const results = [];
  const completed = new Set();
  let currentTime = 0;

  while (completed.size < processes.length) {
    // Find available processes (arrived and not completed)
    const available = processes.filter(p => 
      p.arrivalTime <= currentTime && !completed.has(p.id)
    );

    if (available.length === 0) {
      // No process available, advance to next arrival
      const nextArrival = Math.min(...processes
        .filter(p => !completed.has(p.id))
        .map(p => p.arrivalTime)
      );
      
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        color: '#e5e7eb'
      });
      currentTime = nextArrival;
      continue;
    }

    // Select process with longest burst time
    const selectedProcess = available.reduce((longest, current) => 
      current.burstTime > longest.burstTime ? current : longest
    );

    const startTime = currentTime;
    const finishTime = startTime + selectedProcess.burstTime;
    const waitingTime = startTime - selectedProcess.arrivalTime;
    const turnaroundTime = finishTime - selectedProcess.arrivalTime;

    ganttChart.push({
      processId: selectedProcess.id,
      startTime,
      endTime: finishTime,
      color: getProcessColor(selectedProcess.id)
    });

    results.push({
      ...selectedProcess,
      startTime,
      finishTime,
      waitingTime,
      turnaroundTime
    });

    completed.add(selectedProcess.id);
    currentTime = finishTime;
  }

  return {
    ganttChart,
    results,
    summary: calculateSummary(results)
  };
};

// Helper function to merge consecutive executions of the same process
const mergeConsecutiveExecutions = (ganttChart) => {
  if (ganttChart.length === 0) return ganttChart;

  const merged = [ganttChart[0]];
  
  for (let i = 1; i < ganttChart.length; i++) {
    const current = ganttChart[i];
    const previous = merged[merged.length - 1];
    
    if (current.processId === previous.processId && current.startTime === previous.endTime) {
      // Merge with previous
      previous.endTime = current.endTime;
    } else {
      merged.push(current);
    }
  }
  
  return merged;
};

// Helper function to get consistent colors for processes
const getProcessColor = (processId) => {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6366f1'  // indigo
  ];
  
  // Use process ID to consistently assign colors
  const index = parseInt(processId.replace(/\D/g, '')) % colors.length;
  return colors[index] || colors[0];
};

// Calculate summary statistics
const calculateSummary = (results) => {
  if (results.length === 0) {
    return {
      averageWaitingTime: 0,
      averageTurnaroundTime: 0,
      throughput: 0,
      cpuUtilization: 0
    };
  }

  const totalWaitingTime = results.reduce((sum, process) => sum + process.waitingTime, 0);
  const totalTurnaroundTime = results.reduce((sum, process) => sum + process.turnaroundTime, 0);
  const totalBurstTime = results.reduce((sum, process) => sum + process.burstTime, 0);
  const maxFinishTime = Math.max(...results.map(process => process.finishTime));
  const minArrivalTime = Math.min(...results.map(process => process.arrivalTime));
  const totalTime = maxFinishTime - minArrivalTime;

  return {
    averageWaitingTime: Number((totalWaitingTime / results.length).toFixed(2)),
    averageTurnaroundTime: Number((totalTurnaroundTime / results.length).toFixed(2)),
    throughput: Number((results.length / totalTime).toFixed(2)),
    cpuUtilization: Number(((totalBurstTime / totalTime) * 100).toFixed(2))
  };
};