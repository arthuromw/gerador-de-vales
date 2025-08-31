import React from 'react';
import { Link } from 'react-router-dom';

const ListaVales = ({ vales }) => {
  if (vales.length === 0) {
    return <p>Nenhum vale gerado para esta pessoa ainda.</p>;
  }
  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };
  return (
    <div className="lista-vales-container">
      <div className="lista-vales">
        {vales.map((vale) => (
          <div className="vale-item" key={vale.idVale}>
            <div className="vale-info">
              <p><strong>Código:</strong> {vale.codigo}</p>
              <p><strong>Data:</strong> {formatarData(vale.data)} | <strong>Valor:</strong> R$ {vale.valor}</p>
            </div>
            <Link to={`/vale/${vale.idVale}`} target="_blank" rel="noopener noreferrer">
              <button className="btn-acao btn-ver">Ver / Imprimir</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListaVales;