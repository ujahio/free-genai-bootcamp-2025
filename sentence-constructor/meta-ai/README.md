## Meta Llama 3 70B params

Prompting Technique: Role-Translation Prompt

Observations:

- The model is able to understand the context of the instructions and provide a table of vocabulary.
- The model inconsistently provided clues. Sometimes it did provide clues and sometime didn't.
- After the first couple of iterations, the model ignored my instructions not the transcribe the student's input. The last couple of iterations provided the correct transcription and didn't allow me to guess again after the first failure.
- To fix this, I need to provide the prompts statements and then when it understood the instructions, then I provided the student input. Now it's a bit better at not providing the corrected version even after failed attempts.
- Adding specific examples of sentence structures and bad examples of transcriptions helped the model to understand the instructions better.
