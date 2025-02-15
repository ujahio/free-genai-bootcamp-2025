import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import type { Word } from "./words.service";
import type { StudySession } from "./study-sessions.service";

export interface Group {
	id: number;
	group_name: string;
	word_count: number;
}

export interface GroupsResponse {
	groups: Group[];
	total_pages: number;
	current_page: number;
}

export interface GroupWordsResponse {
	words: Word[];
	total_pages: number;
	current_page: number;
}

export interface GroupStudySessionsResponse {
	study_sessions: StudySession[];
	total_pages: number;
	current_page: number;
}

export const GroupsService = {
	getAll: (page = 1) =>
		apiService.get<GroupsResponse>(`${API_ENDPOINTS.GROUPS}?page=${page}`),
	getById: (id: string) => apiService.get<Group>(API_ENDPOINTS.GROUP(id)),
	getWords: (id: string, page = 1) =>
		apiService.get<GroupWordsResponse>(
			`${API_ENDPOINTS.GROUP(id)}/words?page=${page}`
		),
	getStudySessions: (id: string, page = 1) =>
		apiService.get<GroupStudySessionsResponse>(
			`${API_ENDPOINTS.GROUP(id)}/study_sessions?page=${page}`
		),
};
