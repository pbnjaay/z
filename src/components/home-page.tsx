import Navbar from './navbar';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './theme-provider';

const HomePage = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar></Navbar>
      <div id="main">
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
