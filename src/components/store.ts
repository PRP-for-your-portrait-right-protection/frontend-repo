import create from "zustand";

interface SelectContentState {
  //ts를 사용하기때문에 타입지정이 필요.js사용시 미사용 코드
  faceId: string[];
  setFaceId: (select: string[]) => void;
  removeAllBears: () => void;
  video: any;
  setVideo: (select: any) => void;
  character: string;
  setCharacter: (select: string) => void;
  task: string[];
  setTask: (select: string[]) => void;
}

export const useStore = create<SelectContentState>((set) => ({
  faceId: [],
  setFaceId: (select) => {
    set((state) => ({ ...state, faceId: select }));
  },
  removeAllBears: () => set({ faceId: [] }),

  video: null,
  setVideo: (select) => {
    set((state) => ({ ...state, video: select }));
  },

  character: null,
  setCharacter: (select) => {
    set((state) => ({ ...state, character: select }));
  },

  task: [],
  setTask: (select) => {
    set((state) => ({ ...state, task: select }));
  },
}));
