import { useQuery } from "@tanstack/react-query";
import { StudySessionsService } from "@/services/study-sessions.service";

export const useStudySessions = (page: number) => {
	return useQuery({
		queryKey: ["study-sessions", page],
		queryFn: () => StudySessionsService.getAll(page),
	});
};
