import { createContext, ReactNode, useContext, useState } from "react";

type ThemeContextType ={
    theme :string;
    toggleTheme : ()=> void;
    SetTheme :  (value : string) =>void;

}
interface ThemeProviderProps {
    children : ReactNode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);




const ThemeProviderContext = ({children}: ThemeProviderProps) => {

    const [theme, setTheme] = useState<string>('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const SetTheme = (value: string) => {
        setTheme(value)
    };

  

    return (
        <ThemeContext.Provider value={{ theme , toggleTheme, SetTheme, }} >
            {children}
            
        </ThemeContext.Provider>
    )
}

export default ThemeProviderContext

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};