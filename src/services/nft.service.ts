import { ApiService } from "./api.service"

export const NFTService = {
    getInfo: async (url: string) => {
        const response = await ApiService.get(url);
        return response;
    }
}