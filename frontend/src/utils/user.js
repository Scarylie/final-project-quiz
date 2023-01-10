const BASE_URL = 'http://localhost:8080';

// slug is the suffix of the request
export const API_URL = (slug) => `${BASE_URL}/${slug}`;

export const API_QUIZ = `${BASE_URL}/quiz`;

export const API_QUIZ_ID = (slug) => `${BASE_URL}/quiz/${slug}`;
