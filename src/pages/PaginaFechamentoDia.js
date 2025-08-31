import React, { useMemo } from 'react';
import './PaginaFechamentoDia.css';

const PaginaFechamentoDia = ({ vales }) => {
  const hoje = new Date().toISOString().slice(0, 10);

  const { valesDoDia, totalValor, totalCacambas } = useMemo(() => {
    const filtrados = vales.filter(v => v.data === hoje);
    const valor = filtrados.reduce((acc, v) => acc + parseFloat(v.valor), 0);
    const cacambas = filtrados.reduce((acc, v) => acc + (v.qtdCacambas || 0), 0);
    return { valesDoDia: filtrados, totalValor: valor, totalCacambas: cacambas };
  }, [vales, hoje]);

  const formatarData = (dataISO) => { const [ano, mes, dia] = dataISO.split('-'); return `${dia}/${mes}/${ano}`; };
  const formatarValor = (valor) => { return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };

  return (
    <div className="fechamento-container">
      <div className="relatorio-box">
        <header className="relatorio-header"><h2>Fechamento de Caixa do Dia</h2><p>{formatarData(hoje)}</p></header>
        <section className="summary-box">
          <div className="summary-item"><span>Total de Vales</span><strong>{valesDoDia.length}</strong></div>
          <div className="summary-item"><span>Total de Caçambas</span><strong>{totalCacambas}</strong></div>
          <div className="summary-item valor"><span>Valor Total</span><strong>{formatarValor(totalValor)}</strong></div>
        </section>
        <h3>Detalhamento dos Vales</h3>
        <div className="table-container">
          {valesDoDia.length > 0 ? (
            <table>
              <thead><tr><th>Código</th><th>Beneficiário</th><th>Placa</th><th>Qtd. Caçambas</th><th>Valor</th></tr></thead>
              <tbody>
                {valesDoDia.map(vale => (
                  <tr key={vale.idVale}>
                    <td>{vale.codigo}</td><td>{vale.nome}</td><td>{vale.placa}</td><td>{vale.qtdCacambas || '-'}</td><td>{formatarValor(parseFloat(vale.valor))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p className="aviso">Nenhum vale foi gerado hoje.</p>)}
        </div>
      </div>
      <div className="botoes-acao"><button onClick={() => window.print()}>Imprimir Relatório</button></div>
    </div>
  );
};
export default PaginaFechamentoDia;