import { Link } from "react-router-dom";
import { StudySession } from "@/services/study-sessions.service";

interface StudySessionsListProps {
	sessions: StudySession[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const StudySessionsList = ({
	sessions,
	currentPage,
	totalPages,
	onPageChange,
}: StudySessionsListProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<table className="min-w-full">
				<thead>
					<tr className="bg-gray-100">
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Activity
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Start Time
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							End Time
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Items Reviewed
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{sessions.map((session) => (
						<tr key={session.id} className="hover:bg-gray-50">
							<td className="px-6 py-4">
								<Link
									to={`/study-sessions/${session.id}`}
									className="text-blue-600 hover:text-blue-800"
								>
									{session.activity_name}
								</Link>
							</td>
							<td className="px-6 py-4">
								{new Date(session.start_time).toLocaleString()}
							</td>
							<td className="px-6 py-4">
								{new Date(session.end_time).toLocaleString()}
							</td>
							<td className="px-6 py-4">{session.review_items_count}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-700">
						Page {currentPage} of {totalPages}
					</div>
					<div className="flex space-x-2">
						<button
							onClick={() => onPageChange(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>
						<button
							onClick={() =>
								onPageChange(Math.min(totalPages, currentPage + 1))
							}
							disabled={currentPage === totalPages}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
