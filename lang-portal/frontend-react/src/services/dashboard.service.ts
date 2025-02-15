import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

export interface LastStudySession {
	id: number;
	group_id: number;
	activity_name: string;
	created_at: string;
	correct_count: number;
	wrong_count: number;
}

export interface StudyStats {
	total_vocabulary: number;
	total_words_studied: number;
	mastered_words: number;
	success_rate: number;
	total_sessions: number;
	active_groups: number;
	current_streak: number;
}

export const DashboardService = {
	getLastSession: () =>
		apiService.get<LastStudySession | null>("/dashboard/recent-session"),
	getStats: () => apiService.get<StudyStats>("/dashboard/stats"),
};
