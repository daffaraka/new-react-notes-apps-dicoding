import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { NotesProvider } from './context/NotesContext';
import Navigation from './components/Navigation';
import Homepage from './Homepage';
import Archive from './Archive';
import NoteDetail from './NoteDetail';
import NotFound from './NotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { putAccessToken, getUserLogged } from './utils/notes_api';
import { ThemeProvider } from './context/ThemesContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,
      theme: 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          return {
            theme: prevState.theme === 'light' ? 'dark' : 'light'
          };
        });
      }

    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);


  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      }
    });
  }

  onLoginSuccess({ accessToken }, navigate) {


    putAccessToken(accessToken);
    getUserLogged().then(({ error, data }) => {
      if (!error) {

        this.setState({ authedUser: data });
        navigate('/');  // navigate SETELAH authedUser ter-set
      }
    });



  }

  onLogout() {
    putAccessToken(null);
    this.setState(() => {
      return {
        authedUser: null
      }
    });

  }

  render() {
    const { authedUser, initializing, theme, toggleTheme } = this.state;

    if (initializing) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }


    if (authedUser) {
      return (
        <ThemeProvider value={{ theme, toggleTheme }}>
          <NotesProvider>
            <Navigation onLogout={this.onLogout} authedUser={authedUser} />
            <main>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/notes/:id" element={<NoteDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </NotesProvider>
        </ThemeProvider>

      );
    }

    return (
   
        <ThemeProvider value={{ theme, toggleTheme }}>
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </ThemeProvider>
   
    );
  }
}

export default App;
