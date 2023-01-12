const BASE_URL = 'https://final-project-quiz-gl4puda6xq-lz.a.run.app';

// slug is the suffix of the request
export const API_URL = (slug) => `${BASE_URL}/${slug}`;

export const API_QUIZ = `${BASE_URL}/quiz`;

export const API_QUIZ_ID = (slug) => `${BASE_URL}/quiz/${slug}`;
