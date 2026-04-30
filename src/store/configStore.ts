import { create } from 'zustand'

type configStore = {
    configJSON: String,
    setConfigJSON: (configJSON: String) => void,
    clearConfigJSON: () => void
}

export const useConfigStore = create<configStore>((set) => ({
    configJSON: '',
    setConfigJSON: (configJSON: String) => set({ configJSON }),
    clearConfigJSON: () => set({ configJSON: "" })
}))