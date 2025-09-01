import React, { useState } from 'react';
import FormularioVale from '../components/FormularioVale';
import ListaVales from '../components/ListaVales';

const PaginaGerarVale = ({ pessoas, vales, onGerarVale }) => {
  const [pessoaSelecionadaId, setPessoaSelecionadaId] = useState('');
  const pessoaSelecionada = pessoas.find(p => p.id === parseInt(pessoaSelecionadaId));
  const valesDaPessoaSelecionada = vales
    .filter(v => v.id === parseInt(pessoaSelecionadaId))
    .sort((a, b) => b.idVale - a.idVale);

  return (
    // Usa o layout de container para criar as colunas
    <div className="container">
      <div className="coluna">
        <div className="card">
          <h3>1. Selecione a Pessoa</h3>
          <select value={pessoaSelecionadaId} onChange={(e) => setPessoaSelecionadaId(e.target.value)} className="select-pessoa">
            <option value="">-- Escolha uma pessoa --</option>
            {pessoas.map((pessoa) => (<option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>))}
          </select>
        </div>

        {/* O formulário só aparece se uma pessoa for selecionada */}
        {pessoaSelecionada && (
          <FormularioVale pessoaSelecionada={pessoaSelecionada} onGerarVale={onGerarVale} />
        )}
      </div>
      <div className="coluna">
        {pessoaSelecionada && (
          <div className="card">
            <h3>Vales Recentes de {pessoaSelecionada.nome}</h3>
            <ListaVales vales={valesDaPessoaSelecionada} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginaGerarVale;