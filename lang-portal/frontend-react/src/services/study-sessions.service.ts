import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

export interface StudySession {
	id: number;
	activity_id: number;
	activity_name: string;
	group_id: number;
	group_name: string;
	start_time: string;
	end_time: string;
	review_items_count: number;
}

export interface StudySessionWord {
	japanese: string;
	romaji: string;
	english: string;
	correct_count: number;
	wrong_count: number;
}

export interface StudySessionWordsResponse {
	items: StudySessionWord[];
	pagination: {
		current_page: number;
		total_pages: number;
		total_items: number;
		items_per_page: number;
	};
}

export interface StudySessionsResponse {
	items: StudySession[];
	total: number;
	page: number;
	per_page: number;
	total_pages: number;
}

export const StudySessionsService = {
	getById: (id: string) =>
		apiService.get<StudySession>(API_ENDPOINTS.STUDY_SESSION(id)),
	getWords: (id: string, page = 1) =>
		apiService.get<StudySessionWordsResponse>(
			`${API_ENDPOINTS.STUDY_SESSION_WORDS(id)}?page=${page}&per_page=100`
		),
	getAll: (page = 1) =>
		apiService.get<StudySessionsResponse>(
			`${API_ENDPOINTS.STUDY_SESSIONS}?page=${page}`
		),
};
