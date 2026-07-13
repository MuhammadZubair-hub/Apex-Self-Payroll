import { createSlice, PayloadAction } from '@reduxjs/toolkit';



// interface ThemeState {
//   isDarkMode: boolean;
// }

// const initialState: ThemeState = {
//   isDarkMode: false,
// };

// const themeSlice = createSlice({
//   name: 'theme',
//   initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       state.isDarkMode = !state.isDarkMode;
//     },
//     setTheme: (state, action: PayloadAction<boolean>) => {
//       state.isDarkMode = action.payload;
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;
// export default themeSlice.reducer;


interface ThemeState {
  isDarkMode: boolean;
  isManual: boolean; // true jab user ne khud toggle/switch kiya ho
}

const initialState: ThemeState = {
  isDarkMode: false,
  isManual: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.isManual = true; // user ne khud change kiya
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      state.isManual = true; // yeh bhi manual counted hoga
    },
    setSystemTheme: (state, action: PayloadAction<boolean>) => {
      // sirf tab apply ho jab user ne kabhi manually change nahi kiya
      if (!state.isManual) {
        state.isDarkMode = action.payload;
      }
    },
  },
});

export const { toggleTheme, setTheme, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;