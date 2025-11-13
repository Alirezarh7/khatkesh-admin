import { enqueueSnackbar } from "notistack";

export const setupInterceptors = (axiosInstance: any) => {

  axiosInstance.interceptors.request.use(
    (config: any) => {
      const Token = localStorage.getItem("auth-storage");
      const tokenObj = Token ? JSON.parse(Token).state.token : null;

      if (tokenObj) {
        config.headers["Authorization"] = "Bearer " + tokenObj;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/");
        enqueueSnackbar(error.response.data.error, { variant: "error" });
      } else if (error.response?.status === 502) {
        enqueueSnackbar(
          "سامانه در حال بروز رسانی نسخه جدید می باشد، لطفا ۱۵ دقیقه دیگر مراجعه کنید",
          { variant: "info" }
        );
      }

      return Promise.reject(error);
    }
  );
};
