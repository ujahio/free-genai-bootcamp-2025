import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/services/groups.service";

export const useGroups = (page: number) => {
	return useQuery({
		queryKey: ["groups", page],
		queryFn: () => GroupsService.getAll(page),
	});
};
