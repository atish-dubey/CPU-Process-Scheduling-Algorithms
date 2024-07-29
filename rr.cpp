#include "rr.h"
#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

void rr(const vector<int>& arrival_time, const vector<int>& burst_time) {
    int n = arrival_time.size();
    vector<int> waiting_time(n), turnaround_time(n);
    int time_quantum = 2;

    vector<int> remaining_time(burst_time);
    vector<bool> completed(n, false);

    int current_time = 0;
    int completed_count = 0;
    while (completed_count < n) {
        bool progress_made = false;
        for (int i = 0; i < n; ++i) {
            if (arrival_time[i] <= current_time && !completed[i]) {
                progress_made = true;
                if (remaining_time[i] <= time_quantum) {
                    current_time += remaining_time[i];
                    waiting_time[i] = current_time - burst_time[i] - arrival_time[i];
                    turnaround_time[i] = waiting_time[i] + burst_time[i];
                    completed[i] = true;
                    remaining_time[i] = 0;
                    ++completed_count;
                } else {
                    current_time += time_quantum;
                    remaining_time[i] -= time_quantum;
                }
            }
        }
        if (!progress_made) {
            ++current_time;
        }
    }

    double avg_waiting_time = 0, avg_turnaround_time = 0;
    for (int i = 0; i < n; ++i) {
        avg_waiting_time += waiting_time[i];
        avg_turnaround_time += turnaround_time[i];
    }
    avg_waiting_time /= n;
    avg_turnaround_time /= n;
    double throughput = (double)n / turnaround_time[n-1];

    cout << "Round Robin Scheduling:" << endl;
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
