import { create } from 'zustand';

export type GameStatus = 'title' | 'select' | 'playing' | 'result';

export type Course = {
    id: string;
    name: string;
    price: number;
    timeLimit: number;
};

interface GameState {
    status: GameStatus;
    score: number;
    timeRemaining: number;
    currentCourse: Course | null;

    // Actions
    setStatus: (status: GameStatus) => void;
    startCourse: (course: Course) => void;
    addScore: (points: number) => void;
    decrementTime: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    status: 'title',
    score: 0,
    timeRemaining: 0,
    currentCourse: null,

    setStatus: (status) => set({ status }),

    startCourse: (course) => set({
        status: 'playing',
        currentCourse: course,
        timeRemaining: course.timeLimit,
        score: 0
    }),

    addScore: (points) => set((state) => ({ score: state.score + points })),

    decrementTime: () => set((state) => ({
        timeRemaining: Math.max(0, state.timeRemaining - 1),
        status: state.timeRemaining <= 1 ? 'result' : state.status
    })),

    resetGame: () => set({
        status: 'title',
        score: 0,
        timeRemaining: 0,
        currentCourse: null
    }),
}));
