import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
// import router from './router';
import Sidebar from './pages/Sidebar';
import HomePage from './pages/HomePage';
import AddEngineerForm from "./components/AddEngineerForm";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className="col-auto">
          <Sidebar />

        </div>
        <div className="col-lg-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="consultateEngineer" element={<HomePage />} />
            <Route path="myConsultation" element={<HomePage />} />
            <Route path="addEngineer" element={<AddEngineerForm />} />
            <Route path="deleteEngineer" element={<HomePage />} />
          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
