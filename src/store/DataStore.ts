import {create} from "zustand";

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