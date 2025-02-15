import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

export interface StudyActivity {
	id: number;
	title: string;
	launch_url: string;
	preview_url: string;
}

export interface StudySession {
	id: number;
	group_id: number;
	group_name: string;
	activity_id: number;
	activity_name: string;
	start_time: string;
	end_time: string;
	review_items_count: number;
}

export interface StudySessionsResponse {
	items: StudySession[];
	total: number;
	page: number;
	per_page: number;
	total_pages: number;
}

export const StudyActivitiesService = {
	getAll: () => apiService.get<StudyActivity[]>(API_ENDPOINTS.STUDY_ACTIVITIES),
	getById: (id: string) =>
		apiService.get<StudyActivity>(API_ENDPOINTS.STUDY_ACTIVITY(id)),
	getSessions: (id: string, page = 1) =>
		apiService.get<StudySessionsResponse>(
			`${API_ENDPOINTS.STUDY_ACTIVITY(id)}/sessions?page=${page}`
		),
};
