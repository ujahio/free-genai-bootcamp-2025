export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const API_ENDPOINTS = {
	// Study Activities
	STUDY_ACTIVITIES: "/study-activities",
	STUDY_ACTIVITY: (id: string) => `/study-activities/${id}`,

	// Words
	WORDS: "/words",
	WORD: (id: string) => `/words/${id}`,

	// Groups
	GROUPS: "/groups",
	GROUP: (id: string) => `/groups/${id}`,

	// Sessions
	SESSIONS: "/sessions",
	SESSION: (id: string) => `/sessions/${id}`,
};
