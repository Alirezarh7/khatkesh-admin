import axios from 'axios';
import { currentBaseUrl} from "./baseURL.ts";
import { enqueueSnackbar } from 'notistack';

const automaticallyLogout = (): void => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    window.location.replace('/');

};
const axiosConfig = axios.create({
    baseURL: currentBaseUrl,
});

axiosConfig.interceptors.request.use((config) => {
  const Token = localStorage.getItem('auth-storage');
  const tokenObj = Token ? JSON.parse(Token).state.token : null;
    if (tokenObj) {
        config.headers['Authorization'] = 'Bearer ' + tokenObj;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosConfig.interceptors.response.use(
    response => response,
    axiosError => {
        if (axiosError.response?.status === 401){
            automaticallyLogout()
            enqueueSnackbar(axiosError.response.data.error,{variant: 'error'});
        } else
          if (axiosError.response?.status === 502) {
            return enqueueSnackbar('سامانه در حال بروز رسانی نسخه جدید می باشد، لطفا تا ۱۵ دقیقه دیگر مراجعه نفرمایید', { variant: 'info' });
        } else {
            return Promise.reject(axiosError);
        }
    }
);

export default axiosConfig;
