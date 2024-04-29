import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, ProtectedRoutes, PokemonDetails, PokemonList, Settings  } from './components';
import './App.css';

function App() {
  return (
		<HashRouter>
      <div className="pokeball__background"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<PokemonList />} />
          <Route path="/pokedex/:id" element={<PokemonDetails />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Link className="btn__settings" to="/settings">
        <i className="bx bxs-cog"></i>
      </Link>
    </HashRouter>
  );
}

export default App;
