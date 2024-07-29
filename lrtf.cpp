#include "lrtf.h"
#include <iostream>
#include <vector>
#include <climits>
#include <iomanip>

using namespace std;

void lrtf(const vector<int>& arrival_time, const vector<int>& burst_time) {
    int n = arrival_time.size();
    vector<int> waiting_time(n), turnaround_time(n);
    vector<int> remaining_time(burst_time);
    vector<bool> completed(n, false);

    int current_time = 0, completed_count = 0;
    while (completed_count < n) {
        int max_remaining_time = INT_MIN;
        int longest_index = -1;
        for (int i = 0; i < n; ++i) {
            if (arrival_time[i] <= current_time && !completed[i] && remaining_time[i] > max_remaining_time) {
                max_remaining_time = remaining_time[i];
                longest_index = i;
            }
        }
        if (longest_index == -1) {
            ++current_time;
            continue;
        }
        remaining_time[longest_index]--;
        if (remaining_time[longest_index] == 0) {
            completed[longest_index] = true;
            ++completed_count;
            turnaround_time[longest_index] = current_time + 1 - arrival_time[longest_index];
            waiting_time[longest_index] = turnaround_time[longest_index] - burst_time[longest_index];
        }
        ++current_time;
    }

    double avg_waiting_time = 0, avg_turnaround_time = 0;
    for (int i = 0; i < n; ++i) {
        avg_waiting_time += waiting_time[i];
        avg_turnaround_time += turnaround_time[i];
    }
    avg_waiting_time /= n;
    avg_turnaround_time /= n;
    double throughput = (double)n / turnaround_time[n-1];

    cout << "LRTF Scheduling:" << endl;
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
