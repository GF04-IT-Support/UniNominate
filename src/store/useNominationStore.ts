import { NominationForm, NominationFormInput } from "@/types/nominationTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NominationStore {
  nomination: NominationFormInput;
  setNomination: (nomination: NominationFormInput) => void;
  resetNomination: () => void;
}

const initialNomination: NominationFormInput = {
  name: "",
  description: "",
  formStructure: {},
};

export const useNominationStore = create<NominationStore>()(
  persist(
    (set) => ({
      nomination: initialNomination,
      setNomination: (nomination: NominationFormInput) => set({ nomination }),
      resetNomination: () => set({ nomination: initialNomination }),
    }),
    {
      name: "nomination-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
