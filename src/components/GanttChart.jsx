import React, { useState } from 'react';
import { useTheme } from '../App';

const GanttChart = ({ ganttData, title }) => {
  const { isDarkMode } = useTheme();
  const [hoveredSegment, setHoveredSegment] = useState(null);

  if (!ganttData || ganttData.length === 0) {
    return (
      <div className={`p-8 text-center rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
      }`}>
        No data to display
      </div>
    );
  }

  // Calculate chart dimensions
  const maxTime = Math.max(...ganttData.map(segment => segment.endTime));
  const chartWidth = Math.max(800, maxTime * 40); // Minimum width with scaling
  const segmentHeight = 40;
  const chartHeight = segmentHeight + 60; // Extra space for labels

  // Generate time markers
  const timeMarkers = [];
  for (let i = 0; i <= maxTime; i++) {
    timeMarkers.push(i);
  }

  return (
    <div className={`p-4 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="relative overflow-x-auto">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="border rounded"
          style={{ minWidth: '100%' }}
        >
          {/* Background */}
          <rect
            width={chartWidth}
            height={chartHeight}
            fill={isDarkMode ? '#374151' : '#f9fafb'}
          />

          {/* Time grid lines */}
          {timeMarkers.map(time => (
            <g key={time}>
              <line
                x1={time * (chartWidth / maxTime)}
                y1={0}
                x2={time * (chartWidth / maxTime)}
                y2={chartHeight - 20}
                stroke={isDarkMode ? '#4b5563' : '#e5e7eb'}
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x={time * (chartWidth / maxTime)}
                y={chartHeight - 5}
                textAnchor="middle"
                fontSize="12"
                fill={isDarkMode ? '#9ca3af' : '#6b7280'}
              >
                {time}
              </text>
            </g>
          ))}

          {/* Process segments */}
          {ganttData.map((segment, index) => {
            const x = (segment.startTime / maxTime) * chartWidth;
            const width = ((segment.endTime - segment.startTime) / maxTime) * chartWidth;
            const y = 20;

            return (
              <g key={index}>
                {/* Segment rectangle */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={segmentHeight}
                  fill={segment.processId === 'IDLE' ? (isDarkMode ? '#4b5563' : '#e5e7eb') : segment.color}
                  stroke={isDarkMode ? '#374151' : '#ffffff'}
                  strokeWidth="2"
                  rx="4"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onMouseEnter={() => setHoveredSegment(segment)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />

                {/* Process label */}
                {width > 30 && (
                  <text
                    x={x + width / 2}
                    y={y + segmentHeight / 2 + 4}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill={segment.processId === 'IDLE' ? (isDarkMode ? '#9ca3af' : '#6b7280') : '#ffffff'}
                  >
                    {segment.processId}
                  </text>
                )}

                {/* Time labels on segments */}
                {width > 50 && (
                  <text
                    x={x + width / 2}
                    y={y + segmentHeight / 2 - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill={segment.processId === 'IDLE' ? (isDarkMode ? '#9ca3af' : '#6b7280') : '#ffffff'}
                    opacity="0.8"
                  >
                    {segment.startTime}-{segment.endTime}
                  </text>
                )}
              </g>
            );
          })}

          {/* Timeline axis */}
          <line
            x1={0}
            y1={chartHeight - 20}
            x2={chartWidth}
            y2={chartHeight - 20}
            stroke={isDarkMode ? '#6b7280' : '#374151'}
            strokeWidth="2"
          />
        </svg>

        {/* Tooltip */}
        {hoveredSegment && (
          <div className={`absolute z-10 p-3 rounded-lg shadow-lg border pointer-events-none ${
            isDarkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}
          style={{
            left: `${(hoveredSegment.startTime / maxTime) * chartWidth + 10}px`,
            top: '10px'
          }}>
            <div className="text-sm font-medium">
              {hoveredSegment.processId === 'IDLE' ? 'CPU Idle' : `Process ${hoveredSegment.processId}`}
            </div>
            <div className="text-xs opacity-75">
              Time: {hoveredSegment.startTime} - {hoveredSegment.endTime}
            </div>
            <div className="text-xs opacity-75">
              Duration: {hoveredSegment.endTime - hoveredSegment.startTime} units
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {/* Get unique processes */}
        {Array.from(new Set(ganttData.map(segment => segment.processId)))
          .filter(processId => processId !== 'IDLE')
          .map(processId => {
            const segment = ganttData.find(s => s.processId === processId);
            return (
              <div key={processId} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm">{processId}</span>
              </div>
            );
          })}
        
        {/* Show idle if present */}
        {ganttData.some(segment => segment.processId === 'IDLE') && (
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb' }}
            />
            <span className="text-sm">CPU Idle</span>
          </div>
        )}
      </div>

      {/* Chart Statistics */}
      <div className={`mt-4 p-3 rounded-lg text-sm ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="font-medium">Total Time:</span>
            <span className="ml-2">{maxTime} units</span>
          </div>
          <div>
            <span className="font-medium">Processes:</span>
            <span className="ml-2">
              {Array.from(new Set(ganttData.map(s => s.processId))).filter(id => id !== 'IDLE').length}
            </span>
          </div>
          <div>
            <span className="font-medium">Context Switches:</span>
            <span className="ml-2">
              {ganttData.filter((segment, index) => 
                index > 0 && 
                segment.processId !== ganttData[index - 1].processId &&
                segment.processId !== 'IDLE' &&
                ganttData[index - 1].processId !== 'IDLE'
              ).length}
            </span>
          </div>
          <div>
            <span className="font-medium">Idle Time:</span>
            <span className="ml-2">
              {ganttData
                .filter(segment => segment.processId === 'IDLE')
                .reduce((sum, segment) => sum + (segment.endTime - segment.startTime), 0)} units
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;