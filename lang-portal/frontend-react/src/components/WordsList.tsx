import { Word } from "@/services/words.service";

interface WordsListProps {
	words: Word[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const WordsList = ({
	words,
	currentPage,
	totalPages,
	onPageChange,
}: WordsListProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<table className="min-w-full">
				<thead>
					<tr className="bg-gray-100">
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Kanji
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Romaji
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							English
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Correct
						</th>
						<th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
							Wrong
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{words.map((word) => (
						<tr key={word.id} className="hover:bg-gray-50">
							<td className="px-6 py-4">{word.kanji}</td>
							<td className="px-6 py-4">{word.romaji}</td>
							<td className="px-6 py-4">{word.english}</td>
							<td className="px-6 py-4">{word.correct_count}</td>
							<td className="px-6 py-4">{word.wrong_count}</td>
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
