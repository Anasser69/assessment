import { configureStore, createSlice } from '@reduxjs/toolkit';
import i18n from '../utils/i18n';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const languageSlice = createSlice({
  name: 'language',
  initialState: i18n.locale,
  reducers: {
    toggleLanguage: (state) => {
      const newLanguage = state === 'en' ? 'ar' : 'en';
      i18n.locale = newLanguage;
      return newLanguage;
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;
export const { toggleLanguage } = languageSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    language: languageSlice.reducer,
  },
});

export default store;
