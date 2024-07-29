#include "fcfs.h"
#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

void fcfs(const vector<int>& arrival_time, const vector<int>& burst_time) {
    int n = arrival_time.size();
    vector<int> waiting_time(n), turnaround_time(n);

    waiting_time[0] = 0;
    for (int i = 1; i < n; ++i) {
        waiting_time[i] = 0;
        for (int j = 0; j < i; ++j)
            waiting_time[i] += burst_time[j];
    }

    for (int i = 0; i < n; ++i)
        turnaround_time[i] = waiting_time[i] + burst_time[i];

    double avg_waiting_time = 0, avg_turnaround_time = 0;
    for (int i = 0; i < n; ++i) {
        avg_waiting_time += waiting_time[i];
        avg_turnaround_time += turnaround_time[i];
    }
    avg_waiting_time /= n;
    avg_turnaround_time /= n;
    double throughput = (double)n / turnaround_time[n-1];

    cout << "FCFS Scheduling:" << endl;
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
