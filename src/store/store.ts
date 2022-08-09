import create from "zustand";
import { persist } from "zustand/middleware";
import { storeWhiteListDto, storeVideoDto } from "../utils/types";

interface SelectContentState {
  //ts를 사용하기때문에 타입지정이 필요.js사용시 미사용 코드
  faceId: storeWhiteListDto[];
  setFaceId: (select: storeWhiteListDto[]) => void;
  removeAllData: () => void;
  video: storeVideoDto;
  setVideo: (select: storeVideoDto) => void;
  character: any;
  setCharacter: (select: any) => void;
  task: string[];
  setTask: (select: string[]) => void;
}

export const useStore = create<any>(
  persist((set) => ({
    faceId: [],
    setFaceId: (select) => {
      set((state) => ({ ...state, faceId: select }));
    },
    removeAllData: () => set({ faceId: [], video: null, character: null }),
    removeAllByLogout: () =>
      set({ faceId: [], video: null, character: null, task: [] }),

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
  }))
);
