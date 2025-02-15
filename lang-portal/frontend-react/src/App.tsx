import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Breadcrumbs from "./components/Breadcrumbs";
import Dashboard from "./pages/Dashboard";
import StudyActivities from "./pages/StudyActivities";
import StudyActivity from "./pages/StudyActivity";
import StudyActivityLaunch from "./pages/StudyActivityLaunch";
import Words from "./pages/Words";
import Word from "./pages/Word";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import Sessions from "./pages/Sessions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import StudySession from "./pages/StudySession";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme="system" storageKey="lang-portal-theme">
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<div className="min-h-screen flex flex-col">
						<NavBar />
						<Breadcrumbs />
						<main className="flex-1">
							<Routes>
								<Route
									path="/"
									element={<Navigate to="/dashboard" replace />}
								/>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/study-activities" element={<StudyActivities />} />
								<Route
									path="/study-activities/:id"
									element={<StudyActivity />}
								/>
								<Route
									path="/study-activities/:id/launch"
									element={<StudyActivityLaunch />}
								/>
								<Route path="/words" element={<Words />} />
								<Route path="/words/:id" element={<Word />} />
								<Route path="/groups" element={<Groups />} />
								<Route path="/groups/:id" element={<Group />} />
								<Route path="/sessions" element={<Sessions />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/study-sessions/:id" element={<StudySession />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</main>
					</div>
				</BrowserRouter>
			</TooltipProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;
