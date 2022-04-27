import { Navigate, Route, Routes } from "react-router-dom"
import './App.css';
import HomePage from './pages/home';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/home"
          element={<HomePage />}> <HomePage />
        </Route>
        <Route path="/">
          <Navigate to="/home" />
        </Route>
      </Routes>
    </div>
    </>
  );
}

export default App;