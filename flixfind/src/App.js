import { Navigate, Route, Routes } from "react-router-dom"
import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/home"element={<HomePage />}/>
        <Route path="/login"element={<LoginPage />}/>
      </Routes>
    </div>
    </>
  );
}

export default App;