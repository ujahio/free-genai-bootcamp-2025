import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

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

export const GroupsService = {
	getAll: (page = 1) =>
		apiService.get<GroupsResponse>(`${API_ENDPOINTS.GROUPS}?page=${page}`),
};
