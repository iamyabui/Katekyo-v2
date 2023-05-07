import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeToast, selectToast } from "../../features/toast/toastSlice";

interface Props {
  successMessage: string;
  errorMessage: string;
}

const Toast = ({ successMessage, errorMessage }: Props) => {
  const dispatch = useAppDispatch();
  const { open, status } = useAppSelector(selectToast);

  const handleCloseAlert = () => {
    dispatch(closeToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseAlert}
    >
      <Alert
        onClose={handleCloseAlert}
        severity={status === "Success" ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {status === "Success" ? successMessage : errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
