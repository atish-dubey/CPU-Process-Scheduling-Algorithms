#include "ljf.h"
#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>

using namespace std;

void ljf(const vector<int>& arrival_time, const vector<int>& burst_time) {
    int n = arrival_time.size();
    vector<int> waiting_time(n), turnaround_time(n);
    vector<pair<int, int>> processes(n);

    for (int i = 0; i < n; ++i)
        processes[i] = make_pair(burst_time[i], i);

    sort(processes.begin(), processes.end(), greater<pair<int, int>>());

    int current_time = 0;
    for (int i = 0; i < n; ++i) {
        int idx = processes[i].second;
        if (current_time < arrival_time[idx])
            current_time = arrival_time[idx];
        waiting_time[idx] = current_time - arrival_time[idx];
        current_time += burst_time[idx];
        turnaround_time[idx] = waiting_time[idx] + burst_time[idx];
    }

    double avg_waiting_time = 0, avg_turnaround_time = 0;
    for (int i = 0; i < n; ++i) {
        avg_waiting_time += waiting_time[i];
        avg_turnaround_time += turnaround_time[i];
    }
    avg_waiting_time /= n;
    avg_turnaround_time /= n;
    double throughput = (double)n / turnaround_time[n-1];

    cout << "LJF Scheduling:" << endl;
    cout << "+--------+---------------+------------+---------------+-----------------+" << endl;
    cout << "| Process| Arrival Time  | Burst Time | Waiting Time  | Turnaround Time |" << endl;
    cout << "+--------+---------------+------------+---------------+-----------------+" << endl;
    for (int i = 0; i < n; ++i)
        cout << "| " << setw(6) << i + 1 << " | " << setw(13) << arrival_time[i] << " | " << setw(10) << burst_time[i] << " | " << setw(13) << waiting_time[i] << " | " << setw(15) << turnaround_time[i] << " |" << endl;
    cout << "+--------+---------------+------------+---------------+-----------------+" << endl;

    cout << fixed << setprecision(2);
    cout << "Average Waiting Time: " << avg_waiting_time << endl;
    cout << "Average Turnaround Time: " << avg_turnaround_time << endl;
    cout << "Throughput: " << throughput << endl;
}
