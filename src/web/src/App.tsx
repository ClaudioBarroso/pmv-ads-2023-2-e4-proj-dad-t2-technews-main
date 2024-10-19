import { ThemeProvider } from 'styled-components';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/routes';
import { theme } from './themes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
