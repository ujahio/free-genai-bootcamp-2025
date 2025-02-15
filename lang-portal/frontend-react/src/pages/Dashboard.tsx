import { Link } from "react-router-dom";
import { useLastStudySession, useStudyStats } from "@/hooks/useDashboard";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
	const { data: lastSession, isLoading: sessionLoading } =
		useLastStudySession();
	const { data: stats, isLoading: statsLoading } = useStudyStats();

	if (sessionLoading || statsLoading) return <div>Loading...</div>;

	return (
		<div className="page-container">
			<h1 className="text-3xl font-bold mb-6">Dashboard</h1>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Last Study Session */}
				<section className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<h2 className="text-xl font-semibold mb-4">Last Session</h2>
					{lastSession ? (
						<div className="space-y-4">
							<p className="text-muted-foreground">
								Activity: {lastSession.activity_name}
							</p>
							<p className="text-muted-foreground">
								Date: {new Date(lastSession.created_at).toLocaleString()}
							</p>
							<div className="flex gap-4">
								<div className="text-green-600">
									Correct: {lastSession.correct_count}
								</div>
								<div className="text-red-600">
									Wrong: {lastSession.wrong_count}
								</div>
							</div>
							<Link
								to={`/study-sessions/${lastSession.id}`}
								className="text-blue-600 hover:text-blue-800"
							>
								View Details →
							</Link>
						</div>
					) : (
						<p className="text-muted-foreground">No sessions recorded yet.</p>
					)}
				</section>

				{/* Study Progress */}
				{stats && (
					<section className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
						<h2 className="text-xl font-semibold mb-4">Study Progress</h2>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm text-muted-foreground">
										Words Studied
									</span>
									<span className="text-sm font-medium">
										{stats.total_words_studied}/{stats.total_vocabulary}
									</span>
								</div>
								<Progress
									value={
										(stats.total_words_studied / stats.total_vocabulary) * 100
									}
									className="h-2"
								/>
							</div>
							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm text-muted-foreground">
										Mastery Progress
									</span>
									<span className="text-sm font-medium">
										{(
											(stats.mastered_words / stats.total_vocabulary) *
											100
										).toFixed(1)}
										%
									</span>
								</div>
								<Progress
									value={(stats.mastered_words / stats.total_vocabulary) * 100}
									className="h-2"
								/>
							</div>
						</div>
					</section>
				)}

				{/* Quick Stats */}
				{stats && (
					<section className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
						<h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="p-4 rounded-lg bg-muted">
								<div className="text-2xl font-bold">
									{(stats.success_rate * 100).toFixed(1)}%
								</div>
								<div className="text-sm text-muted-foreground">
									Success Rate
								</div>
							</div>
							<div className="p-4 rounded-lg bg-muted">
								<div className="text-2xl font-bold">{stats.total_sessions}</div>
								<div className="text-sm text-muted-foreground">
									Total Sessions
								</div>
							</div>
							<div className="p-4 rounded-lg bg-muted">
								<div className="text-2xl font-bold">{stats.active_groups}</div>
								<div className="text-sm text-muted-foreground">
									Active Groups
								</div>
							</div>
							<div className="p-4 rounded-lg bg-muted">
								<div className="text-2xl font-bold">{stats.current_streak}</div>
								<div className="text-sm text-muted-foreground">Day Streak</div>
							</div>
						</div>
					</section>
				)}

				{/* Start Studying Button */}
				<Link
					to="/study-activities"
					className="md:col-span-2 flex items-center justify-center px-6 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Start Studying
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
