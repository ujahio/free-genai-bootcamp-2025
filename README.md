# ARCHITECTURE

## FUNCTIONAL REQUIREMENTS

- The system must be accessible at anytime and anywhere in the world.
- The system must scale to support increase in users.
- The system must be able to handle a large number of users.

## RISKS

- Lack of previous knowledge may affect the speed of learning.
- Non-human interaction may affect the learning process.

## ASSUMPTIONS

- The user has access to the internet.
- The user has a modern web browser installed on a desktop and/or mobile device.
- We have access to the latest LLM models that we can experiment with for better language learning capabilities.

## CONSTRAINTS

- The system must be accessible at anytime and anywhere in the world.
- The system must be able to handle a large number of users.
- The system must be able to handle a large number of requests per second.

## INFRASTRUCTURE DESIGN

- Make use of cloud services for scalability and availability.
- Use vector databases for storing and querying AI related data.

## Model Selection

- GPT-4o
- GPT-4o-mini
- o1-mini
- Claude 3.5 Sonnet
- Claude 3.5 Haiku
- Gemini 1.5 Pro

# BUSINESS CONSIDERATIONS

## USE CASES

- The purpose of this project is to create a language portal for students to learn a language by utilizing custom AI workflows for easy learning. At the end of the course, the student should be able to have a conversation in the language.
- The student is to go through a series of lessons in different formats including sentence structuring, speak to learn learning flows, utlizing flash cards and text memorization techniques for higher retention.

## COMPLEXITY

- Designing for a multi-LLM system that works best for different use cases

## LEVERS OF COST

- Assumptions of usage for all models:

  - User Engagement: Each user sends 20 messages per day.
  - Token Count: Each message averages 300 tokens (150 input + 150 output).
  - Total Tokens per User per Day: 6,000 tokens (3,000 input + 3,000 output).
  - Total Tokens for 1,000 Users per Day: 6,000,000 tokens (3,000,000 input + 3,000,000 output).
  - Total Tokens per Month (30 days): 180,000,000 tokens (90,000,000 input + 90,000,000 output).

- OpenAI

  - Using GPT-4o:

    - Input Cost: (90,000,000 / 1,000,000) \* $2.50 = $225
    - Output Cost: (90,000,000 / 1,000,000) \* $10 = $900
    - Total Monthly Cost: $225 (input) + $900 (output) = $1,125

  - Using GPT-4o-mini or o1-mini:
    - Input Cost: (90,000,000 / 1,000,000) \* $1.10 = $99
    - Output Cost: (90,000,000 / 1,000,000) \* $4.40 = $396
    - Total Monthly Cost: $99 (input) + $396 (output) = $495

- Anthropic

  - Using Claude 3.5 Sonnet:

    - Input Cost: (90,000,000 / 1,000,000) \* $3 = $270
    - Output Cost: (90,000,000 / 1,000,000) \* $15 = $1,350
    - Total Monthly Cost: $270 (input) + $1,350 (output) = $1,620

  - Using Claude 3.5 Haiku:
    - Input Cost: (90,000,000 / 1,000,000) \* $0.80 = $72
    - Output Cost: (90,000,000 / 1,000,000) \* $4 = $360
    - Total Monthly Cost: $72 (input) + $360 (output) = $432

- Gemini
  - Using Gemini 1.5 Pro:
    - Input Cost: (90,000,000 / 1,000,000) \* $3 = $270
    - Output Cost: (90,000,000 / 1,000,000) \* $15 = $1,350
    - Total Monthly Cost: $270 (input) + $1,350 (output) = $1,620
