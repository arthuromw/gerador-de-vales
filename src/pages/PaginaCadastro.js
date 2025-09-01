import React from 'react';
import CadastroPessoa from '../components/CadastroPessoa';

const PaginaCadastro = ({ pessoas, onAdicionarPessoa }) => {
  return (
    <div className="container">
      <div className="coluna">
        <CadastroPessoa onAdicionarPessoa={onAdicionarPessoa} />
      </div>
      <div className="coluna">
        <div className="card">
          <h3>Pessoas Cadastradas</h3>
          <div className="lista-pessoas">
            {pessoas.length > 0 ? (
              <ul>
                {pessoas.map(p => <li key={p.id}>{p.nome} - {p.cnpj}</li>)}
              </ul>
            ) : (
              <p className="aviso">Nenhuma pessoa cadastrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaginaCadastro;
