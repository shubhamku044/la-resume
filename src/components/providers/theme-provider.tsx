import { ThemeProvider as LandingThemeProvider } from '../landing/theme-provider';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <LandingThemeProvider>{children}</LandingThemeProvider>;
}

export default ThemeProvider;
