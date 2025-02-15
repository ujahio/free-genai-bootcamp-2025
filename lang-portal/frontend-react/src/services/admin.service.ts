import { apiService } from "./api.service";

interface ResetResponse {
	message: string;
}

export const AdminService = {
	resetHistory: () => apiService.post<ResetResponse>("/api/reset_history", {}),
	fullReset: () => apiService.post<ResetResponse>("/api/full_reset", {}),
};
