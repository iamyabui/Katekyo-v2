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
    closeToast: (state) => {
      state.open = false;
    },
    openToast: (state) => {
      state.open = true;
    },
    setErrorMessage: (state) => {
      state.open = true;
      state.status = "Error";
    },
    setSuccessMessage: (state) => {
      state.open = true;
      state.status = "Success";
    },
  },
});

export const { closeToast, openToast, setErrorMessage, setSuccessMessage } =
  toastSlice.actions;

export const selectToast = (state: { toast: ToastState }) => ({
  open: state.toast.open,
  status: state.toast.status,
});

export default toastSlice.reducer;
