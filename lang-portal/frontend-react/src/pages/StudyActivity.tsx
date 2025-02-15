import { useParams, Link } from "react-router-dom";
import {
	useStudyActivity,
	useStudyActivitySessions,
} from "@/hooks/useStudyActivities";
import { useState } from "react";

const StudyActivity = () => {
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const { data: activity, isLoading: activityLoading } = useStudyActivity(id);
	const { data: sessionsData, isLoading: sessionsLoading } =
		useStudyActivitySessions(id, page);

	if (activityLoading || sessionsLoading) return <div>Loading...</div>;
	if (!activity || !sessionsData) return <div>Not found</div>;

	return (
		<div className="page-container">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-6">{activity.title}</h1>
				<img
					src={activity.preview_url}
					alt={activity.title}
					className="w-full max-w-2xl h-64 object-cover rounded-lg mb-4"
				/>
				<Link
					to={`/study-activities/${activity.id}/launch`}
					className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 inline-block"
				>
					Launch Activity
				</Link>
			</div>

			<div>
				<h2 className="text-2xl font-semibold mb-4">Past Sessions</h2>
				<table className="min-w-full border-collapse border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-200 px-4 py-2">Group</th>
							<th className="border border-gray-200 px-4 py-2">Start Time</th>
							<th className="border border-gray-200 px-4 py-2">End Time</th>
							<th className="border border-gray-200 px-4 py-2">
								Items Reviewed
							</th>
						</tr>
					</thead>
					<tbody>
						{sessionsData.items.map((session) => (
							<tr key={session.id} className="hover:bg-gray-50">
								<td className="border border-gray-200 px-4 py-2">
									{session.group_name}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{new Date(session.start_time).toLocaleString()}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{new Date(session.end_time).toLocaleString()}
								</td>
								<td className="border border-gray-200 px-4 py-2 text-center">
									{session.review_items_count}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className="mt-4 flex justify-between items-center">
					<div className="text-sm text-gray-600">
						Page {sessionsData.page} of {sessionsData.total_pages}
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
							className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
						>
							Previous
						</button>
						<button
							onClick={() =>
								setPage((p) => Math.min(sessionsData.total_pages, p + 1))
							}
							disabled={page === sessionsData.total_pages}
							className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudyActivity;
