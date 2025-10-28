import {create} from 'zustand'

type ModalState = {
  modals: {[key:string]:boolean},
  open: (key:string) => void,
  close: (key:string) => void,
}
export const useModalStore = create<ModalState>((set) => ({
  modals:{},
  open: (key) => set((state) => ({modals: { ...state.modals, [key]: true }})),
  close: (key) => set((state) => ({modals: { ...state.modals, [key]: false }})),
}));

type SetDataType  = {
  dataTypeIds: any,
  setDataTypeIdsAsync: (ids: any) => Promise<void>,
}

export const useSetDataStore = create<SetDataType>((set) => ({
  dataTypeIds: {},
  setDataTypeIdsAsync: (ids: any) => new Promise<void>(resolve => {
    set({dataTypeIds: ids});
    setTimeout(resolve , 0)
  })
}));