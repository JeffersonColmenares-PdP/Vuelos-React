import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import './App.css'
import Principal from './components/Principal'

function App() {
  const navegar = useNavigate();

  useEffect(() => {
    navegar('/');
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Principal />} />
      </Routes>
    </>
  )
}

export default App
