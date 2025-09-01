import React from 'react';
import { Link } from 'react-router-dom';
import { formatarData } from '../utils/formatters';

const ListaVales = ({ vales }) => {
  if (!vales || vales.length === 0) {
    return <p className="aviso">Nenhum vale recente para esta pessoa.</p>;
  }

  return (
    <div className="lista-vales">
      {vales.map((vale) => (
        <div className="vale-item" key={vale.idVale}>
          <div className="vale-info">
            <p><strong>Código:</strong> {vale.codigo}</p>
            <p><strong>Data:</strong> {formatarData(vale.data)} | <strong>Valor:</strong> R$ {vale.valor}</p>
          </div>
          <Link to={`/vale/${vale.idVale}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            Ver / Imprimir
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListaVales;
