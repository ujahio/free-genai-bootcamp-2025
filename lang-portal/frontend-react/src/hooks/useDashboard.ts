import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboard.service";

export const useLastStudySession = () => {
	return useQuery({
		queryKey: ["last-study-session"],
		queryFn: () => DashboardService.getLastSession(),
	});
};

export const useStudyStats = () => {
	return useQuery({
		queryKey: ["study-stats"],
		queryFn: () => DashboardService.getStats(),
	});
};
