import { enqueueSnackbar } from "notistack";

export function enqueNotistack(msg: string, props?: any) {
  const options = {
    autoHideDuration: 3000,
    anchorOrigin: { horizontal: "center", vertical: "top" },
    variant: "default",
    ...props,
  };
  return enqueueSnackbar(msg, options);
}
