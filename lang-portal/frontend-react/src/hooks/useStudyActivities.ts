import { useQuery } from "@tanstack/react-query";
import { StudyActivitiesService } from "@/services/study-activities.service";

export const useStudyActivities = () => {
	return useQuery({
		queryKey: ["study-activities"],
		queryFn: StudyActivitiesService.getAll,
	});
};

export const useStudyActivity = (id: string) => {
	return useQuery({
		queryKey: ["study-activity", id],
		queryFn: () => StudyActivitiesService.getById(id),
	});
};

export const useStudyActivitySessions = (id: string, page = 1) => {
	return useQuery({
		queryKey: ["study-activity-sessions", id, page],
		queryFn: () => StudyActivitiesService.getSessions(id, page),
	});
};
