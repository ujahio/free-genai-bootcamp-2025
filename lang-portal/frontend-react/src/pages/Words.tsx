// In your Words.tsx component
import { useWords } from "@/hooks/useWords";

const Words = () => {
	const { words, addWord, updateWord, deleteWord } = useWords();

	if (words.isLoading) return <div>Loading...</div>;
	if (words.error) return <div>Error: {words.error.message}</div>;

	return (
		<div className="p-4">
			<table className="min-w-full border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-200 px-4 py-2">Kanji</th>
						<th className="border border-gray-200 px-4 py-2">Romaji</th>
						<th className="border border-gray-200 px-4 py-2">English</th>
						<th className="border border-gray-200 px-4 py-2">Correct</th>
						<th className="border border-gray-200 px-4 py-2">Wrong</th>
					</tr>
				</thead>
				<tbody>
					{words.data?.words?.map((word) => (
						<tr key={word.id} className="hover:bg-gray-50">
							<td className="border border-gray-200 px-4 py-2">{word.kanji}</td>
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
			<div className="mt-4 text-sm text-gray-600">
				Total Words: {words.data?.total_words} | Page {words.data?.current_page}{" "}
				of {words.data?.total_pages}
			</div>
		</div>
	);
};

export default Words;
