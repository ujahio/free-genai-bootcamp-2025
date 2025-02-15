import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStudySession, useStudySessionWords } from "@/hooks/useStudySession";

const StudySession = () => {
	const { id } = useParams();
	const [page, setPage] = useState(1);

	const { data: session, isLoading: sessionLoading } = useStudySession(id);

	const { data: wordsData, isLoading: wordsLoading } = useStudySessionWords(
		id,
		page
	);

	if (sessionLoading || wordsLoading) return <div>Loading...</div>;
	if (!session || !wordsData) return <div>Not found</div>;

	return (
		<div className="page-container">
			{/* Session Details Card */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h1 className="text-3xl font-bold mb-4">Study Session</h1>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<h2 className="text-sm font-medium text-gray-500">Activity</h2>
						<p className="text-lg">{session.activity_name}</p>
					</div>
					<div>
						<h2 className="text-sm font-medium text-gray-500">Group</h2>
						<p className="text-lg">{session.group_name}</p>
					</div>
					<div>
						<h2 className="text-sm font-medium text-gray-500">Start Time</h2>
						<p className="text-lg">
							{new Date(session.start_time).toLocaleString()}
						</p>
					</div>
					<div>
						<h2 className="text-sm font-medium text-gray-500">End Time</h2>
						<p className="text-lg">
							{new Date(session.end_time).toLocaleString()}
						</p>
					</div>
					<div>
						<h2 className="text-sm font-medium text-gray-500">
							Items Reviewed
						</h2>
						<p className="text-lg">{session.review_items_count}</p>
					</div>
				</div>
			</div>

			{/* Words Table */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-200 px-4 py-2">Japanese</th>
							<th className="border border-gray-200 px-4 py-2">Romaji</th>
							<th className="border border-gray-200 px-4 py-2">English</th>
							<th className="border border-gray-200 px-4 py-2">Correct</th>
							<th className="border border-gray-200 px-4 py-2">Wrong</th>
						</tr>
					</thead>
					<tbody>
						{wordsData.items.map((word, index) => (
							<tr key={index} className="hover:bg-gray-50">
								<td className="border border-gray-200 px-4 py-2">
									{word.japanese}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{word.romaji}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{word.english}
								</td>
								<td className="border border-gray-200 px-4 py-2 text-center">
									{word.correct_count}
								</td>
								<td className="border border-gray-200 px-4 py-2 text-center">
									{word.wrong_count}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className="p-4 flex justify-between items-center border-t">
					<div className="text-sm text-gray-600">
						Total Words: {wordsData.pagination.total_items} | Page{" "}
						{wordsData.pagination.current_page} of{" "}
						{wordsData.pagination.total_pages}
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
								setPage((p) =>
									Math.min(wordsData.pagination.total_pages, p + 1)
								)
							}
							disabled={page === wordsData.pagination.total_pages}
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

export default StudySession;
