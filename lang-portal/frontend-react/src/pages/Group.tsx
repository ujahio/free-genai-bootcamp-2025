import { useState } from "react";
import { useParams } from "react-router-dom";
import {
	useGroup,
	useGroupWords,
	useGroupStudySessions,
} from "@/hooks/useGroups";
import { WordsList } from "@/components/WordsList";
import { StudySessionsList } from "@/components/StudySessionsList";

const Group = () => {
	const { id } = useParams();
	const [wordsPage, setWordsPage] = useState(1);
	const [sessionsPage, setSessionsPage] = useState(1);

	const { data: group, isLoading: groupLoading } = useGroup(id);
	const { data: wordsData, isLoading: wordsLoading } = useGroupWords(
		id,
		wordsPage
	);
	const { data: sessionsData, isLoading: sessionsLoading } =
		useGroupStudySessions(id, sessionsPage);

	if (groupLoading || wordsLoading || sessionsLoading)
		return <div>Loading...</div>;
	if (!group || !wordsData || !sessionsData) return <div>Not found</div>;

	return (
		<div className="page-container">
			{/* Group Header */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h1 className="text-3xl font-bold mb-4">{group.group_name}</h1>
				<div className="text-gray-600">
					Total Words: <span className="font-medium">{group.word_count}</span>
				</div>
			</div>

			{/* Words Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Words in Group</h2>
				<WordsList
					words={wordsData.words}
					currentPage={wordsData.current_page}
					totalPages={wordsData.total_pages}
					onPageChange={setWordsPage}
				/>
			</div>

			{/* Study Sessions Section */}
			<div>
				<h2 className="text-2xl font-bold mb-4">Study Sessions</h2>
				<StudySessionsList
					sessions={sessionsData.study_sessions}
					currentPage={sessionsData.current_page}
					totalPages={sessionsData.total_pages}
					onPageChange={setSessionsPage}
				/>
			</div>
		</div>
	);
};

export default Group;
