import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PaginaConsulta = ({ vales, onConfirmarPagamento, onDeletarVale, onDeletarTodos }) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const isSearching = filtroTexto || dataInicio || dataFim;

  const valesFiltrados = useMemo(() => {
    // Ordena os vales para mostrar os mais recentes primeiro
    const valesOrdenados = [...vales].sort((a, b) => b.idVale - a.idVale);

    if (!isSearching) return valesOrdenados; // Mostra todos se não houver filtro
    
    return valesOrdenados.filter(vale => {
      const termoBusca = filtroTexto.toLowerCase();
      const correspondeTermo = termoBusca === '' ||
        (vale.nome || '').toLowerCase().includes(termoBusca) ||
        (vale.cnpj || '').includes(termoBusca) ||
        (vale.placa || '').toLowerCase().includes(termoBusca) ||
        (vale.codigo || '').toLowerCase().includes(termoBusca) ||
        vale.qtdCacambas?.toString().includes(termoBusca) ||
        (vale.status || '').toLowerCase().includes(termoBusca);

      const dataVale = new Date(vale.data + "T00:00:00");
      const inicio = dataInicio ? new Date(dataInicio + "T00:00:00") : null;
      const fim = dataFim ? new Date(dataFim + "T00:00:00") : null;
      const correspondeData = (!inicio || dataVale >= inicio) && (!fim || dataVale <= fim);

      return correspondeTermo && correspondeData;
    });
  }, [vales, filtroTexto, dataInicio, dataFim, isSearching]);

  const formatarData = (dataISO) => {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };
  
  const formatarValor = (valor) => {
    if (valor === undefined || valor === null) return '';
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="card">
      <h3>Consultar Vales</h3>
      <div className="filtros-container">
        <input type="text" placeholder="Buscar por nome, CNPJ, status, placa, código..." value={filtroTexto} onChange={e => setFiltroTexto(e.target.value)} />
        <input title="Data de Início" type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
        <input title="Data Final" type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
      </div>

      <div className="acoes-administrativas">
        <button onClick={onDeletarTodos} className="btn-perigo">
          Deletar Todos os Vales
        </button>
      </div>

      <div className="table-container">
        {valesFiltrados.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Beneficiário</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {valesFiltrados.map(vale => (
                <tr key={vale.idVale}>
                  <td>{vale.codigo}</td>
                  <td>{formatarData(vale.data)}</td>
                  <td>{vale.nome}</td>
                  <td>
                    <span className={`status status-${vale.status}`}>
                      {vale.status}
                    </span>
                  </td>
                  <td>{formatarValor(vale.valor)}</td>
                  <td className="acoes-cell">
                    <Link to={`/vale/${vale.idVale}?via=cliente`} target="_blank" rel="noopener noreferrer">
                      <button className="btn-acao btn-ver">Cliente</button>
                    </Link>
                    <Link to={`/vale/${vale.idVale}?via=controle`} target="_blank" rel="noopener noreferrer">
                      <button className="btn-acao btn-ver">Controle</button>
                    </Link>
                    <Link to={`/editar-vale/${vale.idVale}`}>
                      <button className="btn-acao btn-editar">Editar</button>
                    </Link>
                    {vale.status === 'pendente' && (
                      <button onClick={() => onConfirmarPagamento(vale.idVale)} className="btn-acao btn-confirmar">Pagar</button>
                    )}
                    <button onClick={() => onDeletarVale(vale.idVale)} className="btn-acao btn-deletar">Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="aviso">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PaginaConsulta;