import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectToast, toggle } from "../../features/toast/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectToast);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(toggle())}
    >
      <Alert
        onClose={() => dispatch(toggle())}
        severity="success"
        sx={{ width: "100%" }}
      >
        変更が保存されました!
      </Alert>
    </Snackbar>
  );
};

export default Toast;
