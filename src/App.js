import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import PaginaCadastro from './pages/PaginaCadastro';
import PaginaGerarVale from './pages/PaginaGerarVale';
import PaginaConsulta from './pages/PaginaConsulta';
import PaginaFechamentoDia from './pages/PaginaFechamentoDia';
import PaginaEditarVale from './pages/PaginaEditarVale';
import ValeImpressao from './pages/ValeImpressao';

import './App.css';

const getInitialData = () => {
  const pessoasIniciais = [
    { id: 1, nome: 'João da Silva Transportes', cnpj: '11.111.111/0001-11', placa: 'AAA-1111' },
    { id: 2, nome: 'Maria Souza Cargas', cnpj: '22.222.222/0001-22', placa: 'BBB-2222' },
    { id: 3, nome: 'Pedro Rocha Fretes', cnpj: '33.333.333/0001-33', placa: 'CCC-3333' },
  ];
  const hojeString = new Date().toISOString().slice(0, 10);
  const valesIniciais = [
    { id: 1, nome: 'João da Silva Transportes', cnpj: '11.111.111/0001-11', placa: 'AAA-1111', valor: '150.00', qtdCacambas: 1, data: hojeString, idVale: 1724450000001, codigo: 'VALE-25-00001', status: 'pago' },
    { id: 2, nome: 'Maria Souza Cargas', cnpj: '22.222.222/0001-22', placa: 'BBB-2222', valor: '320.00', qtdCacambas: 2, data: '2025-08-15', idVale: 1724450000002, codigo: 'VALE-25-00002', status: 'pendente' },
    { id: 1, nome: 'João da Silva Transportes', cnpj: '11.111.111/0001-11', placa: 'XYZ-9876', valor: '95.80', qtdCacambas: 1, data: '2025-07-25', idVale: 1724450000003, codigo: 'VALE-25-00003', status: 'pendente' },
    { id: 3, nome: 'Pedro Rocha Fretes', cnpj: '33.333.333/0001-33', placa: 'CCC-3333', valor: '450.00', qtdCacambas: 3, data: '2025-08-20', idVale: 1724450000004, codigo: 'VALE-25-00004', status: 'pago' },
    { id: 2, nome: 'Maria Souza Cargas', cnpj: '22.222.222/0001-22', placa: 'BBB-2222', valor: '210.00', qtdCacambas: 2, data: '2024-12-01', idVale: 1724450000005, codigo: 'VALE-24-00005', status: 'pendente' },
  ];
  return { pessoasIniciais, valesIniciais };
};

function App() {
  const [pessoas, setPessoas] = useState(() => {
    const salvo = localStorage.getItem('pessoas');
    return salvo ? JSON.parse(salvo) : getInitialData().pessoasIniciais;
  });
  const [vales, setVales] = useState(() => {
    const salvo = localStorage.getItem('valesGerados');
    return salvo ? JSON.parse(salvo) : getInitialData().valesIniciais;
  });
  const [contadorVales, setContadorVales] = useState(() => {
    const salvo = localStorage.getItem('contadorVales');
    return salvo ? parseInt(salvo) : getInitialData().valesIniciais.length;
  });

  useEffect(() => {
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
  }, [pessoas]);

  useEffect(() => {
    localStorage.setItem('valesGerados', JSON.stringify(vales));
    localStorage.setItem('contadorVales', contadorVales.toString());
  }, [vales, contadorVales]);

  const dashboardStats = useMemo(() => {
    const hoje = new Date().toISOString().slice(0, 10);
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth() + 1;
    const mesAnoAtual = `${anoAtual}-${String(mesAtual).padStart(2, '0')}`;
    const valesHoje = vales.filter(v => v.data === hoje);
    const valesMes = vales.filter(v => v.data.startsWith(mesAnoAtual));
    const totalValorHoje = valesHoje.reduce((acc, vale) => acc + parseFloat(vale.valor), 0);
    const totalValorMes = valesMes.reduce((acc, vale) => acc + parseFloat(vale.valor), 0);
    return {
      valesGeradosHoje: valesHoje.length,
      valesGeradosMes: valesMes.length,
      totalVales: vales.length,
      totalPessoas: pessoas.length,
      valorTotalHoje: totalValorHoje,
      valorTotalMes: totalValorMes,
    };
  }, [vales, pessoas]);

  const handleAdicionarPessoa = (novaPessoa) => {
    setPessoas([...pessoas, novaPessoa]);
    alert(`Pessoa "${novaPessoa.nome}" cadastrada com sucesso!`);
  };

  const handleGerarVale = (dadosDoVale) => {
    const novoContador = contadorVales + 1;
    const ano = new Date().getFullYear().toString().slice(-2);
    const codigoUnico = `VALE-${ano}-${String(novoContador).padStart(5, '0')}`;
    const novoVale = { ...dadosDoVale, codigo: codigoUnico, status: 'pendente' };
    setVales(prevVales => [...prevVales, novoVale]);
    setContadorVales(novoContador);
  };

  const handleConfirmarPagamento = (idVale) => {
    setVales(vales.map(vale => vale.idVale === idVale ? { ...vale, status: 'pago' } : vale));
  };

  const handleDeletarVale = (idVale) => {
    if (window.confirm("Tem certeza que deseja deletar este vale? Esta ação não pode ser desfeita.")) {
      setVales(vales.filter(vale => vale.idVale !== idVale));
    }
  };
  
  const handleDeletarTodosOsVales = () => {
    if (window.confirm("ATENÇÃO!\n\nVocê está prestes a deletar TODOS os vales gerados.\nEsta ação não pode ser desfeita.\n\nDeseja continuar?")) {
      if (window.confirm("CONFIRMAÇÃO FINAL:\n\nDeletar todos os vales permanentemente do armazenamento?")) {
        localStorage.removeItem('valesGerados');
        localStorage.removeItem('contadorVales');
        setVales([]);
        setContadorVales(0);
        alert("Todos os dados de vales foram deletados com sucesso.");
      }
    }
  };

  const handleEditarVale = (idVale, dadosAtualizados) => {
    setVales(vales.map(vale => 
      vale.idVale === idVale 
        ? { ...vale, ...dadosAtualizados } 
        : vale
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Sistema Gerador de Vales</h1>
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home stats={dashboardStats} />} />
          <Route path="/cadastrar" element={<PaginaCadastro pessoas={pessoas} onAdicionarPessoa={handleAdicionarPessoa} />} />
          <Route path="/gerar" element={<PaginaGerarVale pessoas={pessoas} vales={vales} onGerarVale={handleGerarVale} />} />
          <Route path="/consultar" element={<PaginaConsulta vales={vales} onConfirmarPagamento={handleConfirmarPagamento} onDeletarVale={handleDeletarVale} onDeletarTodos={handleDeletarTodosOsVales} />} />
          <Route path="/fechamento-dia" element={<PaginaFechamentoDia vales={vales} />} />
          <Route path="/vale/:idVale" element={<ValeImpressao />} />
          <Route path="/editar-vale/:idVale" element={<PaginaEditarVale vales={vales} onEditarVale={handleEditarVale} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;