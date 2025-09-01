import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Gerador de Vales</h2>
      </div>
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

export default SideBar;
