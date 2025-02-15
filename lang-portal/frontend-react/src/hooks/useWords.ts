import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WordsService, type Word } from "@/services/words.service";

export const useWords = () => {
	const queryClient = useQueryClient();

	const words = useQuery({
		queryKey: ["words"],
		queryFn: WordsService.getAll,
	});

	const addWord = useMutation({
		mutationFn: WordsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["words"] });
		},
	});

	const updateWord = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Word> }) =>
			WordsService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["words"] });
		},
	});

	const deleteWord = useMutation({
		mutationFn: WordsService.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["words"] });
		},
	});

	return {
		words,
		addWord,
		updateWord,
		deleteWord,
	};
};

export const useWord = (id: string) => {
	return useQuery({
		queryKey: ["words", id],
		queryFn: () => WordsService.getById(id),
	});
};
