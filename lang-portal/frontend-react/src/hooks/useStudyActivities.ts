import { useQuery, useMutation } from "@tanstack/react-query";
import { StudyActivitiesService } from "@/services/study-activities.service";
import { useNavigate } from "react-router-dom";

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

export const useStudyActivityLaunch = (id?: string) => {
	const navigate = useNavigate();

	// Get launch data (activity details and available groups)
	const { data, isLoading } = useQuery({
		queryKey: ["study-activity-launch", id],
		queryFn: () => StudyActivitiesService.getLaunchData(id!),
		enabled: !!id,
	});

	// Launch mutation
	const launchMutation = useMutation({
		mutationFn: (groupId: number) =>
			StudyActivitiesService.launchActivity(id!, { group_id: groupId }),
		onSuccess: (response) => {
			// Open activity in new tab
			window.open(response.launch_url, "_blank");
			// Navigate to session page
			navigate(`/study-sessions/${response.session_id}`);
		},
	});

	return {
		data,
		isLoading,
		launchMutation,
	};
};
