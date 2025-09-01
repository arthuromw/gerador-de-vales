import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { formatarValor } from '../utils/formatters';

const Home = ({ stats }) => {
  return (
    <div className="home-container">
      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-number">{stats.valesGeradosHoje}</span>
          <span className="stat-label">Vales Gerados Hoje</span>
        </div>
        <div className="stat-card valor">
          <span className="stat-number">{formatarValor(stats.valorTotalHoje)}</span>
          <span className="stat-label">Valor Gerado Hoje</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.valesGeradosMes}</span>
          <span className="stat-label">Vales Gerados no Mês</span>
        </div>
        <div className="stat-card valor">
          <span className="stat-number">{formatarValor(stats.valorTotalMes)}</span>
          <span className="stat-label">Valor Total no Mês</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalPendentes}</span>
          <span className="stat-label">Vales Pendentes</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalPagos}</span>
          <span className="stat-label">Vales Pagos</span>
        </div>
      </section>

      <section className="main-nav">
        <Link to="/gerar" className="nav-button">Gerar Novo Vale</Link>
        <Link to="/consultar" className="nav-button">Consultar Vales</Link>
        <Link to="/cadastrar" className="nav-button">Gerenciar Pessoas</Link>
        <Link to="/fechamento-dia" className="nav-button special-action">Fechamento do Dia</Link>
      </section>
    </div>
  );
};

export default Home;