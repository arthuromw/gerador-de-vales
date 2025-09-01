import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/ui/Pagination'; // NOVO
import EmptyState from '../components/ui/EmptyState'; // NOVO

const PaginaConsulta = ({ vales, onConfirmarPagamento, onDeletarVale, onDeletarTodos }) => {
  // Estados para filtros
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos'); // NOVO: Filtro de status
  
  // Estados para UX
  const [loadingAction, setLoadingAction] = useState(null); // Controla o loading dos botões
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Lógica de filtro aprimorada
  const valesFiltrados = useMemo(() => {
    return [...vales]
      .filter(vale => {
        if (filtroStatus !== 'todos' && vale.status !== filtroStatus) {
          return false;
        }
        const termoBusca = filtroTexto.toLowerCase();
        return termoBusca === '' ||
          (vale.nome || '').toLowerCase().includes(termoBusca) ||
          (vale.codigo || '').toLowerCase().includes(termoBusca) ||
          (vale.placa || '').toLowerCase().includes(termoBusca);
      })
      .sort((a, b) => b.idVale - a.idVale);
  }, [vales, filtroTexto, filtroStatus]);

  // Lógica de paginação
  const totalPages = Math.ceil(valesFiltrados.length / ITEMS_PER_PAGE);
  const valesPaginados = valesFiltrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Funções de ação com loading state
  const handleAction = (action, id) => {
    setLoadingAction(id);
    // Simula uma chamada de API
    setTimeout(() => {
      action(id);
      setLoadingAction(null);
    }, 500); // 0.5 segundo de delay para feedback visual
  };

  if (vales.length === 0) {
    return (
      <EmptyState 
        message="Nenhum vale foi gerado no sistema ainda."
        ctaText="Gerar o primeiro vale"
        ctaLink="/gerar"
      />
    );
  }

  return (
    <div className="card">
      <h3>Consultar Vales</h3>
      <div className="filtros-container">
        <input type="text" placeholder="Buscar por código, nome, placa..." value={filtroTexto} onChange={e => setFiltroTexto(e.target.value)} />
        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="todos">Todos os Status</option>
          <option value="pendente">Pendentes</option>
          <option value="pago">Pagos</option>
        </select>
      </div>
      
      {vales.length > 0 && (
        <div className="acoes-administrativas">
          <button onClick={onDeletarTodos} className="btn btn-danger btn-sm">
            Deletar Todos os Vales
          </button>
        </div>
      )}

      {/* LÓGICA DE EXIBIÇÃO CORRIGIDA */}
      {vales.length === 0 ? (
        <EmptyState 
          message="Nenhum vale foi gerado no sistema ainda."
          ctaText="Gerar o primeiro vale"
          ctaLink="/gerar"
        />
      ) : valesPaginados.length > 0 ? (
        <>
          <div className="table-container">
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
                {valesPaginados.map(vale => (
                  <tr key={vale.idVale}>
                    {/* ... (células da tabela) ... */}
                    <td className="acoes-cell">
                      {/* ESTILO DE BOTÃO MELHORADO */}
                      <Link className="btn btn-secondary btn-sm" to={`/vale/${vale.idVale}?via=cliente`} target="_blank" rel="noopener noreferrer">Cliente</Link>
                      <Link className="btn btn-secondary btn-sm" to={`/vale/${vale.idVale}?via=controle`} target="_blank" rel="noopener noreferrer">Controle</Link>
                      <Link className="btn btn-warning btn-sm" to={`/editar-vale/${vale.idVale}`}>Editar</Link>
                      
                      {vale.status === 'pendente' && (
                        <button 
                          onClick={() => handleAction(onConfirmarPagamento, vale.idVale)} 
                          className="btn btn-success btn-sm"
                          disabled={loadingAction === vale.idVale}
                        >
                          {loadingAction === vale.idVale ? '...' : 'Pagar'}
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction(onDeletarVale, vale.idVale)} 
                        className="btn btn-danger btn-sm"
                        disabled={loadingAction === vale.idVale}
                      >
                        {loadingAction === vale.idVale ? '...' : 'Deletar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="aviso">Nenhum resultado encontrado para os filtros aplicados.</p>
      )}
    </div>
  );
};

export default PaginaConsulta;