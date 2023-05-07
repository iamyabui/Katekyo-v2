import { createSlice } from "@reduxjs/toolkit";

export interface ToastState {
  open: boolean;
  status: "Success" | "Error";
}

const initialState: ToastState = {
  open: false,
  status: "Success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toggle: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggle } = toastSlice.actions;

export const selectToast = (state: { toast: ToastState }) => ({
  open: state.toast.open,
  status: state.toast.status,
});

export default toastSlice.reducer;
