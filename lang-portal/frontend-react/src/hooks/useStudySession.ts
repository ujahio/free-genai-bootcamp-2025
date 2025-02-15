import { useQuery } from "@tanstack/react-query";
import { StudySessionsService } from "@/services/study-sessions.service";

export const useStudySession = (id?: string) => {
	return useQuery({
		queryKey: ["study-session", id],
		queryFn: () => StudySessionsService.getById(id!),
		enabled: !!id,
	});
};

export const useStudySessionWords = (id?: string, page = 1) => {
	return useQuery({
		queryKey: ["study-session-words", id, page],
		queryFn: () => StudySessionsService.getWords(id!, page),
		enabled: !!id,
	});
};
