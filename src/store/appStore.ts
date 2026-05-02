import {create} from "zustand";

// model App {
//   id          String   @id @default(uuid())
//   name        String
//   config_json Json
//   createdAt   DateTime @default(now())

//   userId String
//   user   User @relation(fields: [userId], references: [id], onDelete: Cascade)

//   records Record[]
// }

interface AppStore {
    appData: any[];
    setAppData: (app: any[]) => void;
    appendAppData: (app: any) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    appData: [],
    setAppData: (app) => set({ appData: app }),
    appendAppData: (app) => set((state) => ({ appData: [...state.appData, app] })),
}))