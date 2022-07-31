import create from "zustand";

interface SelectContentState {
  //ts를 사용하기때문에 타입지정이 필요.js사용시 미사용 코드
  faceId: any[];
  setFaceId: (select: any[]) => void;
  removeAllData: () => void;
  video: any;
  setVideo: (select: any) => void;
  character: any;
  setCharacter: (select: any) => void;
  task: string[];
  setTask: (select: string[]) => void;
}

export const useStore = create<SelectContentState>((set) => ({
  faceId: [],
  setFaceId: (select) => {
    set((state) => ({ ...state, faceId: select }));
  },
  removeAllData: () => set({ faceId: [], video: null, character: null }),

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
