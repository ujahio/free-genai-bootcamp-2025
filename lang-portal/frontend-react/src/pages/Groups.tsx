import { useState } from "react";
import { Link } from "react-router-dom";
import { useGroups } from "@/hooks/useGroups";

const Groups = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, isError } = useGroups(page);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading groups</div>;
	if (!data) return null;

	return (
		<div className="page-container">
			<h1 className="text-3xl font-bold mb-6">Word Groups</h1>

			{/* Groups Table */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<table className="min-w-full">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
								Group Name
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
								Word Count
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{data.groups.map((group) => (
							<tr key={group.id} className="hover:bg-gray-50">
								<td className="px-6 py-4">
									<Link
										to={`/groups/${group.id}`}
										className="text-blue-600 hover:text-blue-800"
									>
										{group.group_name}
									</Link>
								</td>
								<td className="px-6 py-4 text-gray-500">
									{group.word_count} words
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-700">
							Page {data.current_page} of {data.total_pages}
						</div>
						<div className="flex space-x-2">
							<button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							<button
								onClick={() =>
									setPage((p) => Math.min(data.total_pages, p + 1))
								}
								disabled={page === data.total_pages}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Groups;
