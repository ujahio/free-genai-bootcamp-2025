import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStudyActivityLaunch } from "@/hooks/useStudyActivities";

const StudyActivityLaunch = () => {
	const { id } = useParams();
	const [selectedGroupId, setSelectedGroupId] = useState<number | "">("");
	const { data, isLoading, launchMutation } = useStudyActivityLaunch(id);

	if (isLoading) return <div>Loading...</div>;
	if (!data) return <div>Not found</div>;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedGroupId) return;

		launchMutation.mutate(selectedGroupId);
	};

	return (
		<div className="page-container max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h1 className="text-3xl font-bold mb-6">{data.activity.title}</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="group"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Select Group
						</label>
						<select
							id="group"
							value={selectedGroupId}
							onChange={(e) => setSelectedGroupId(Number(e.target.value))}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							required
						>
							<option value="">Select a group...</option>
							{data.groups.map((group) => (
								<option key={group.id} value={group.id}>
									{group.name}
								</option>
							))}
						</select>
					</div>

					<button
						type="submit"
						disabled={!selectedGroupId || launchMutation.isPending}
						className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{launchMutation.isPending ? "Launching..." : "Launch Activity"}
					</button>
				</form>

				{launchMutation.isError && (
					<div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
						Failed to launch activity. Please try again.
					</div>
				)}
			</div>
		</div>
	);
};

export default StudyActivityLaunch;
