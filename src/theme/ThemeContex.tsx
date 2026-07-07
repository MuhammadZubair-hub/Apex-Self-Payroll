import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { setTheme as setThemeAction, toggleTheme as toggleThemeAction } from '../redux/slices/themeSlice';

// Theme now lives in redux (theme slice, persisted via redux-persist) instead of React Context,
// so it survives app restarts. Kept the same hook name/shape as the old context-based version so
// none of its ~20 call sites needed to change.
export const useThemeContext = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? 'dark' : 'light';

  const toggleTheme = () => dispatch(toggleThemeAction());
  const SetTheme = (value: string) => dispatch(setThemeAction(value === 'dark'));

  return { theme, toggleTheme, SetTheme };
};
