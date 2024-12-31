import { create } from 'zustand';

export interface ToDoTaskDto {
    id: string;
    label: string;
    complete: boolean;
};

interface ToDoTasksCdo {
    tasks: ToDoTaskDto[];
    addTask: (task: ToDoTaskDto) => void;
    removeTask: (taskID: string) => void;
    toggleComplete: (taskID: string) => void;
    loadTasks: (tasks: ToDoTaskDto[]) => void;
};

const handleToggleComplete = (tasks: ToDoTaskDto[], taskID: string): ToDoTaskDto[] => {
    const taskToToggle = tasks.find(task => task.id === taskID);
    const taskToToggleIndex = tasks.findIndex(task => task.id === taskID);
    if (taskToToggle) {
        taskToToggle.complete = !taskToToggle.complete;
        tasks[taskToToggleIndex] = taskToToggle;
    }
    
    return tasks;
};

export const useToDoStore = create<ToDoTasksCdo>((set) => ({
    tasks: [],
    addTask: (task: ToDoTaskDto) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (taskID: string) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== taskID) })),
    toggleComplete: (taskID: string) => set((state) => ({ tasks: handleToggleComplete(state.tasks, taskID) })),
    loadTasks: (tasks) => set({ tasks: tasks }),
}));