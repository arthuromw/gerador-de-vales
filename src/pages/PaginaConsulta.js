import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { formatarData, formatarValor } from '../utils/formatters';

const PaginaConsulta = ({ vales, onConfirmarPagamento, onDeletarVale }) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [loadingAction, setLoadingAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const valesFiltrados = useMemo(() => {
    return [...vales]
      .filter(vale => {
        if (filtroStatus !== 'todos' && vale.status !== filtroStatus) return false;
        const termoBusca = filtroTexto.toLowerCase();
        return termoBusca === '' || (vale.nome || '').toLowerCase().includes(termoBusca) || (vale.codigo || '').toLowerCase().includes(termoBusca) || (vale.placa || '').toLowerCase().includes(termoBusca);
      })
      .sort((a, b) => b.idVale - a.idVale);
  }, [vales, filtroTexto, filtroStatus]);

  const totalPages = Math.ceil(valesFiltrados.length / ITEMS_PER_PAGE);
  const valesPaginados = valesFiltrados.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleAction = (action, id) => {
    setLoadingAction(id);
    setTimeout(() => { action(id); setLoadingAction(null); }, 500);
  };

  return (
    <div className="card">
      <h3>Consultar Vales</h3>
      <div className="filtros-container">
        <input type="text" placeholder="Buscar por código, nome, placa..." value={filtroTexto} onChange={e => { setFiltroTexto(e.target.value); setCurrentPage(1); }} />
        <select value={filtroStatus} onChange={e => { setFiltroStatus(e.target.value); setCurrentPage(1); }}>
          <option value="todos">Todos os Status</option>
          <option value="pendente">Pendentes</option>
          <option value="pago">Pagos</option>
        </select>
      </div>
      

      {vales.length === 0 ? (
        <EmptyState message="Nenhum vale foi gerado no sistema ainda." ctaText="Gerar o primeiro vale" ctaLink="/gerar" />
      ) : valesPaginados.length > 0 ? (
        <>
          <div className="table-container">
            <table>
              <thead><tr><th>Código</th><th>Data</th><th>Beneficiário</th><th>Status</th><th>Valor</th><th>Ações</th></tr></thead>
              <tbody>
                {valesPaginados.map(vale => (
<tr key={vale.idVale}>
  <td data-label="Código">{vale.codigo}</td>
  <td data-label="Data">{formatarData(vale.data)}</td>
  <td data-label="Beneficiário">{vale.nome}</td>
  <td data-label="Status"><span className={`status status-${vale.status}`}>{vale.status}</span></td>
  <td data-label="Valor">{formatarValor(vale.valor)}</td>
  <td className="acoes-cell">
                      <Link className="btn btn-secondary btn-sm" to={`/vale/${vale.idVale}?via=cliente`} target="_blank" rel="noopener noreferrer">Cliente</Link>
                      <Link className="btn btn-secondary btn-sm" to={`/vale/${vale.idVale}?via=controle`} target="_blank" rel="noopener noreferrer">Controle</Link>
                      <Link className="btn btn-warning btn-sm" to={`/editar-vale/${vale.idVale}`}>Editar</Link>
                      {vale.status === 'pendente' && (
                        <button onClick={() => handleAction(onConfirmarPagamento, vale.idVale)} className="btn btn-success btn-sm" disabled={loadingAction === vale.idVale}>
                          {loadingAction === vale.idVale ? '...' : 'Pagar'}
                        </button>
                      )}
                      <button onClick={() => { if(window.confirm('Confirmar deleção?')) { handleAction(onDeletarVale, vale.idVale) }}} className="btn btn-danger btn-sm" disabled={loadingAction === vale.idVale}>
                        {loadingAction === vale.idVale ? '...' : 'Deletar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : (
        <p className="aviso">Nenhum resultado encontrado para os filtros aplicados.</p>
      )}
    </div>
  );
};
export default PaginaConsulta;