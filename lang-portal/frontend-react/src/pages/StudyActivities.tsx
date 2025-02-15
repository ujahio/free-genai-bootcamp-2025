import { useStudyActivities } from "@/hooks/useStudyActivities";
import { Link } from "react-router-dom";

const StudyActivityCard = ({ activity }) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<img
				src={activity.preview_url}
				alt={activity.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
				<div className="flex gap-2">
					<Link
						to={`/study-activities/${activity.id}/launch`}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Launch
					</Link>
					<Link
						to={`/study-activities/${activity.id}`}
						className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

const StudyActivities = () => {
	const { data: activities, isLoading, error } = useStudyActivities();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="page-container">
			<h1 className="text-3xl font-bold mb-6">Study Activities</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{activities?.map((activity) => (
					<StudyActivityCard key={activity.id} activity={activity} />
				))}
			</div>
		</div>
	);
};

export default StudyActivities;
