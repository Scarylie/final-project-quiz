import { createSlice } from '@reduxjs/toolkit';

// initialize accessToken from local storage
const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    email: null,
    accessToken,
    error: null,
  },

  reducers: {
    setUserId: (store, action) => {
      console.log(`setUserId action.payload`, action.payload);
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      console.log(`setUsername action.payload`, action.payload);
      store.username = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
      console.log(`setAccessToken action.payload`, action.payload);
    },
    setError: (store, action) => {
      store.accessToken = action.payload;
    },
    logout: (store) => {
      localStorage.removeItem('accessToken');
      (store.userId = null),
        (store.username = null),
        (store.email = null),
        (store.accessToken = null);
      store.error = null;
    },
  },
});

export default user;
