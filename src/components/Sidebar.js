// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-link">Dashboard</NavLink>
        <NavLink to="/gerar" className="nav-link">Gerar Vale</NavLink>
        <NavLink to="/consultar" className="nav-link">Consultar Vales</NavLink>
        <NavLink to="/cadastrar" className="nav-link">Gerenciar Pessoas</NavLink>
        <NavLink to="/fechamento-dia" className="nav-link">Fechamento do Dia</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 