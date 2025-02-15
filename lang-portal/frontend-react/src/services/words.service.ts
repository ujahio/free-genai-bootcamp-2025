import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

export interface Word {
	id: number;
	kanji: string;
	romaji: string;
	english: string;
	correct_count: number;
	wrong_count: number;
}

export interface WordsResponse {
	words: Word[];
	current_page: number;
	total_pages: number;
	total_words: number;
}

export const WordsService = {
	getAll: () => apiService.get<WordsResponse>(API_ENDPOINTS.WORDS),
	getById: (id: string) => apiService.get<Word>(API_ENDPOINTS.WORD(id)),
	create: (word: Omit<Word, "id">) =>
		apiService.post<Word>(API_ENDPOINTS.WORDS, word),
	update: (id: string, word: Partial<Word>) =>
		apiService.put<Word>(API_ENDPOINTS.WORD(id), word),
	delete: (id: string) => apiService.delete(API_ENDPOINTS.WORD(id)),
};
