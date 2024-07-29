
# CPU-Process-Scheduling-Algorithms
An implementation of various CPU scheduling algorithms in C++. The algorithms included are First Come First Serve (FCFS), Round Robin (RR), Shortest Job First (SJF), Shortest Remaining Time First (SRTF), Longest Remaining Time First (LRTF), Longest Job First (LJF).

## Overview
CPU Scheduling is a process of determining which process will own CPU for execution while another process is on hold. The main task of CPU scheduling is to make sure that whenever the CPU remains idle, the OS at least selects one of the processes available in the ready queue for execution. The selection process will be carried out by the CPU scheduler. It selects one of the processes in memory that are ready for execution.

## Installation Steps
1. To clone the project:
   ```sh
   git clone https://github.com/atish-dubey/CPU-Process-Scheduling-Algorithms.git

2. Change Directory:
   ```sh
   cd CPU-Process-Scheduling-Algorithms

3. For Compilation
   ```sh
   g++ main.cpp fcfs.cpp sjf.cpp rr.cpp srtf.cpp ljf.cpp lrtf.cpp -o CPU-Process-Scheduling-Algorithms

4. To Run The project
   ```sh
   ./CPU-Process-Scheduling-Algorithms

## Screenshots of the Project

Step1: To setup the project
![Screenshot 2024-07-29 231916](https://github.com/user-attachments/assets/dffd67e1-94c2-4096-9597-d5b2d4ebf9f3)

Step2: Give the input
![Screenshot 2024-07-29 232642](https://github.com/user-attachments/assets/7ac7456f-caae-4318-ac1b-8c1cb437fe5c)

Step3: Select The Scheduling Algorithm
![Screenshot 2024-07-29 232901](https://github.com/user-attachments/assets/dd54466c-032c-4a2a-8935-cdcec3a8cfe6)


# Scheduling Algorithms
In computing, scheduling is the method by which work is assigned to resources that complete the work. The work may be virtual computation elements such as threads, processes or data flows, which are in turn scheduled onto hardware resources such as processors, network links or expansion cards. A scheduler is what carries out the scheduling activity. Schedulers are often implemented so they keep all computer resources busy (as in load balancing), allow multiple users to share system resources effectively, or to achieve a target quality of service. Scheduling is fundamental to computation itself, and an intrinsic part of the execution model of a computer system; the concept of scheduling makes it possible to have computer multitasking with a single central processing unit (CPU). Given below are the description about 8 implemented algorithms
### 1. First Come First Serve (FCFS)
- First Come First Served (FCFS) is a scheduling algorithm in which the process that arrives first is executed first. It is a simple and easy-to-understand algorithm, but it can lead to poor performance if there are processes with long burst times. This algorithm does not have any mechanism for prioritizing processes, so it is considered a non-preemptive algorithm. In FCFS scheduling, the process that arrives first is executed first, regardless of its burst time or priority. This can lead to poor performance, as longer running processes will block shorter ones from being executed. It is commonly used in batch systems where the order of the processes is important.

### 2. Round Robin with varying time quantum (RR)
- Round Robin is the preemptive process scheduling algorithm. Each process is provided a fix time to execute, it is called a quantum. Once a process is executed for a given time period, it is preempted and other process executes for a given time period. Context switching is used to save states of preempted processes.

### 3. Shortest Job First (SJF)
- Shortest Job First is a scheduling policy that selects the waiting process with the smallest execution time to execute next. It is a non-preemptive and Greedy algorithm. Shortest Job first has the advantage of having a minimum average waiting time among all scheduling algorithms. It may cause starvation if shorter processes keep coming.

### 4. Shortest Remaining Time First (SRTF)
- This Algorithm is the preemptive version of SJF scheduling. In SRTF, the execution of the process can be stopped after certain amount of time. At the arrival of every process, the short term scheduler schedules the process with the least remaining burst time among the list of available processes and the running process.

### 5. Priority Scheduling
- Priority Scheduling is a method of scheduling processes that is based on priority. Hence, the scheduler selects the tasks to work as per the priority. The processes with higher priority should be carried out first, whereas jobs with equal priorities are carried out on a round-robin or FCFS basis. Priority depends upon memory requirements, time requirements, etc.

### 6. Highest Response Ratio Next (HRRN)
- Prerequisite – CPU Scheduling Given n processes with their Arrival times and Burst times, the task is to find average waiting time and average turn around time using HRRN scheduling algorithm. The name itself states that we need to find the response ratio of all available processes and select the one with the highest Response Ratio. A process once selected will run till completion.

### 7. Longest Job First (LJF)
- Longest Job First is a non-preemptive scheduling algorithm. This algorithm is based upon the burst time of the processes. The processes are put into the ready queue based on their burst times i.e., in a descending order of the burst times. As the name suggests this algorithm is based upon the fact that the process with the largest burst time is processed first. The burst time of only those processes is considered that have arrived in the system until that time.

### 8. Longest Remaining Time First (LRTF)
- Prerequisite – Process Management & CPU Scheduling This is a pre-emptive version of Longest Job First (LJF) scheduling algorithm. In this scheduling algorithm, we find the process with the maximum remaining time and then process it. We check for the maximum remaining time after some interval of time(say 1 unit each) to check if another process having more Burst Time arrived up to that time.
## Authors

- [@atish-dubey](https://www.github.com/atish-dubey)

 Feel free to reach out to me on my GitHub profile for any questions or contributions to the project


