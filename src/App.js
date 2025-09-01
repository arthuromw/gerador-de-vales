import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

// Componentes e Páginas
;
import SideBar from './components/SideBar'; // Nome do arquivo atualizado
import Home from './pages/Home';
import Header from './components/Header'
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
  const hojeString = "2025-08-31";
  const valesIniciais = [
    { id: 1, nome: 'João da Silva Transportes', cnpj: '11.111.111/0001-11', placa: 'AAA-1111', valor: '150.00', qtdCacambas: 1, observacoes: 'Adiantamento semanal', data: hojeString, idVale: 1724450000001, codigo: 'VALE-25-00001', status: 'pago' },
    { id: 2, nome: 'Maria Souza Cargas', cnpj: '22.222.222/0001-22', placa: 'BBB-2222', valor: '320.00', qtdCacambas: 2, observacoes: '', data: '2025-08-15', idVale: 1724450000002, codigo: 'VALE-25-00002', status: 'pendente' },
  ];
  return { pessoasIniciais, valesIniciais };
};

function App() {
  const [pessoas, setPessoas] = useState(() => {
    try { const salvo = localStorage.getItem('pessoas'); if (salvo) { const p = JSON.parse(salvo); if (Array.isArray(p)) return p; } } catch (e) { console.error("Erro ao carregar pessoas:", e); }
    return getInitialData().pessoasIniciais;
  });
  const [vales, setVales] = useState(() => {
    try { const salvo = localStorage.getItem('valesGerados'); if (salvo) { const v = JSON.parse(salvo); if (Array.isArray(v)) return v; } } catch (e) { console.error("Erro ao carregar vales:", e); }
    return getInitialData().valesIniciais;
  });
  const [contadorVales, setContadorVales] = useState(() => {
    const salvo = localStorage.getItem('contadorVales');
    return salvo ? parseInt(salvo) : getInitialData().valesIniciais.length;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { localStorage.setItem('pessoas', JSON.stringify(pessoas)); }, [pessoas]);
  useEffect(() => {
    localStorage.setItem('valesGerados', JSON.stringify(vales));
    localStorage.setItem('contadorVales', contadorVales.toString());
  }, [vales, contadorVales]);
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const dashboardStats = useMemo(() => {
    const hoje = new Date().toISOString().slice(0, 10);
    const mesAnoAtual = hoje.slice(0, 7);
    const valesHoje = vales.filter(v => v.data === hoje);
    const valesMes = vales.filter(v => v.data.startsWith(mesAnoAtual));
    const totalValorHoje = valesHoje.reduce((acc, v) => acc + parseFloat(v.valor), 0);
    const totalValorMes = valesMes.reduce((acc, v) => acc + parseFloat(v.valor), 0);
    return {
      valesGeradosHoje: valesHoje.length, valesGeradosMes: valesMes.length,
      totalVales: vales.length, totalPessoas: pessoas.length,
      valorTotalHoje: totalValorHoje, valorTotalMes: totalValorMes,
      totalPendentes: vales.filter(v => v.status === 'pendente').length,
      totalPagos: vales.filter(v => v.status === 'pago').length,
    };
  }, [vales, pessoas]);

  const handleAdicionarPessoa = (novaPessoa) => {
    setPessoas(prev => [...prev, novaPessoa]);
    toast.success(`Pessoa "${novaPessoa.nome}" cadastrada!`);
  };
  const handleGerarVale = (dadosDoVale) => {
    const novoContador = contadorVales + 1;
    const ano = new Date().getFullYear().toString().slice(-2);
    const codigoUnico = `VALE-${ano}-${String(novoContador).padStart(5, '0')}`;
    const novoVale = { ...dadosDoVale, codigo: codigoUnico, status: 'pendente', observacoes: dadosDoVale.observacoes || '' };
    setVales(prevVales => [...prevVales, novoVale]);
    setContadorVales(novoContador);
    toast.success(`Vale ${codigoUnico} gerado com sucesso!`);
  };
  const handleConfirmarPagamento = (idVale) => {
    setVales(vales.map(vale => vale.idVale === idVale ? { ...vale, status: 'pago' } : vale));
    toast.success('Vale marcado como pago!');
  };
  const handleDeletarVale = (idVale) => {
    setVales(vales.filter(vale => vale.idVale !== idVale));
    toast.success('Vale deletado com sucesso.');
  };
  const handleDeletarTodosOsVales = () => {
    if (window.confirm("ATENÇÃO! Deletar TODOS os vales permanentemente?")) {
      localStorage.removeItem('valesGerados');
      localStorage.removeItem('contadorVales');
      setVales([]);
      setContadorVales(0);
      toast.success("Todos os vales foram deletados.");
    }
  };
  const handleEditarVale = (idVale, dadosAtualizados) => {
    setVales(vales.map(vale => vale.idVale === idVale ? { ...vale, ...dadosAtualizados } : vale));
    toast.success('Vale atualizado com sucesso!');
  };

  return (
    <div className="App-container">
      <Toaster position="top-right" reverseOrder={false} />
      <SideBar isOpen={isMenuOpen} />
      <div className="content-wrap">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home stats={dashboardStats} />} />
            <Route path="/cadastrar" element={<PaginaCadastro pessoas={pessoas} onAdicionarPessoa={handleAdicionarPessoa} />} />
            <Route path="/gerar" element={<PaginaGerarVale pessoas={pessoas} vales={vales} onGerarVale={handleGerarVale} />} />
            <Route path="/consultar" element={<PaginaConsulta vales={vales} onConfirmarPagamento={handleConfirmarPagamento} onDeletarVale={handleDeletarVale} onDeletarTodos={handleDeletarTodosOsVales} />} />
            <Route path="/fechamento-dia" element={<PaginaFechamentoDia vales={vales} />} />
            <Route path="/editar-vale/:idVale" element={<PaginaEditarVale vales={vales} onEditarVale={handleEditarVale} />} />
            <Route path="/vale/:idVale" element={<ValeImpressao />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

