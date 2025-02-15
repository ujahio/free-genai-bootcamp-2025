export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const API_ENDPOINTS = {
	// Study Activities
	STUDY_ACTIVITIES: "/api/study-activities",
	STUDY_ACTIVITY: (id: string) => `/api/study-activities/${id}`,

	// Words
	WORDS: "/api/words",
	WORD: (id: string) => `/api/words/${id}`,

	// Groups
	GROUPS: "/api/groups",
	GROUP: (id: string) => `/api/groups/${id}`,

	// Study Sessions
	STUDY_SESSIONS: "/api/study-sessions",
	STUDY_SESSION: (id: string) => `/api/study-sessions/${id}`,
	STUDY_SESSION_WORDS: (id: string) => `/api/study-sessions/${id}/words`,
};
