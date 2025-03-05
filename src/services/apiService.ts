import axios from "axios";
import config from "../config";
import { STORAGE_KEY } from "../constants";
type TConfig = {
    headers: any,
}
const apiService = axios.create({
    baseURL: config.apiUrl,
})
apiService.interceptors.request.use((config: TConfig)=>{
    let accessToken = '';
    const currentUser = localStorage.getItem(STORAGE_KEY.CURRENT_USER);
    if(currentUser){
        accessToken = JSON.parse(currentUser).accessToken;
    }
    config.headers = {
        ...config.headers,
        TokenCybersoft : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjIwLzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Mjk2OTYwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzMTE3MjAwfQ.Qh5EKISAVqlhbNkgh1gtzDLUv1TXC7WpqNdNpAS2274",
        Authorization: `Bearer ${accessToken}`
    }
    return config;
})
export default apiService