import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/services/groups.service";

export const useGroups = (page: number) => {
	return useQuery({
		queryKey: ["groups", page],
		queryFn: () => GroupsService.getAll(page),
	});
};

export const useGroup = (id?: string) => {
	return useQuery({
		queryKey: ["group", id],
		queryFn: () => GroupsService.getById(id!),
		enabled: !!id,
	});
};

export const useGroupWords = (id?: string, page = 1) => {
	return useQuery({
		queryKey: ["group-words", id, page],
		queryFn: () => GroupsService.getWords(id!, page),
		enabled: !!id,
	});
};

export const useGroupStudySessions = (id?: string, page = 1) => {
	return useQuery({
		queryKey: ["group-study-sessions", id, page],
		queryFn: () => GroupsService.getStudySessions(id!, page),
		enabled: !!id,
	});
};
