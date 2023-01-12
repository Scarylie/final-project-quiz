import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    email: null,
    error: null,
  },

  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setError: (store, action) => {
      store.accessToken = action.payload;
    },
    logout: (store) => {
      localStorage.removeItem('accessToken');
      (store.userId = null),
        (store.username = null),
        (store.email = null),
        (store.error = null);
    },
  },
});

export default user;
