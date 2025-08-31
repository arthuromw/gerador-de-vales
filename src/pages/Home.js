import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ stats }) => {
  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  return (
    <div className="home-container">
      <section className="dashboard-stats">
        <div className="stat-card"><span className="stat-number">{stats.valesGeradosHoje}</span><span className="stat-label">Vales Gerados Hoje</span></div>
        <div className="stat-card valor"><span className="stat-number">{formatarValor(stats.valorTotalHoje)}</span><span className="stat-label">Valor Gerado Hoje</span></div>
        <div className="stat-card"><span className="stat-number">{stats.valesGeradosMes}</span><span className="stat-label">Vales Gerados no Mês</span></div>
        <div className="stat-card valor"><span className="stat-number">{formatarValor(stats.valorTotalMes)}</span><span className="stat-label">Valor Total no Mês</span></div>
        <div className="stat-card"><span className="stat-number">{stats.totalPessoas}</span><span className="stat-label">Pessoas Cadastradas</span></div>
      </section>
      <nav className="main-nav">
        <h2>Menu Principal</h2>
        <Link to="/gerar" className="nav-button">Gerar Novo Vale</Link>
        <Link to="/consultar" className="nav-button">Consultar Vales</Link>
        <Link to="/cadastrar" className="nav-button">Cadastrar / Ver Pessoas</Link>
        <Link to="/fechamento-dia" className="nav-button special-action">Fechamento do Dia</Link>
      </nav>
    </div>
  );
};
export default Home;