import axios from "axios";

const api = axios.create();

api.interceptors.response.use((res)=>res.data);

export const ApiService = {
    post: (url: string,data: any, config: any = {}) => api.post(url,data,config),
    get: (url: string) => api.get(url)
}