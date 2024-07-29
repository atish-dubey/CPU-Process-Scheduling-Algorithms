#include <iostream>
#include <vector>
#include "fcfs.h"
#include "sjf.h"
#include "rr.h"
#include "srtf.h"
#include "ljf.h"
#include "lrtf.h"

using namespace std;

void printOptions() {
    cout << "Select the scheduling algorithm:" << endl;
    cout << "1. First Come First Serve (FCFS)" << endl;
    cout << "2. Shortest Job First (SJF)" << endl;
    cout << "3. Round Robin (RR)" << endl;
    cout << "4. Shortest Remaining Time First (SRTF)" << endl;
    cout << "5. Longest Job First (LJF)" << endl;
    cout << "6. Longest Remaining Time First (LRTF)" << endl;
}

int main() {
    int choice;
    cout << "Enter the number of processes: ";
    int process_count;
    cin >> process_count;

    vector<int> arrival_time(process_count), burst_time(process_count);
    for (int i = 0; i < process_count; ++i) {
        cout << "Enter arrival time and burst time for process " << i + 1 << ": ";
        cin >> arrival_time[i] >> burst_time[i];
    }

    printOptions();
    cout << "Enter your choice: ";
    cin >> choice;

    switch (choice) {
        case 1:
            fcfs(arrival_time, burst_time);
            break;
        case 2:
            sjf(arrival_time, burst_time);
            break;
        case 3:
            rr(arrival_time, burst_time);
            break;
        case 4:
            srtf(arrival_time, burst_time);
            break;
        case 5:
            ljf(arrival_time, burst_time);
            break;
        case 6:
            lrtf(arrival_time, burst_time);
            break;
        default:
            cout << "Invalid choice" << endl;
    }

    return 0;
}
