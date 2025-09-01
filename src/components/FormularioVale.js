import React, { useState } from 'react';

const FormularioVale = ({ pessoaSelecionada, onGerarVale }) => {
  const [valorUnitario, setValorUnitario] = useState('');
  const [qtdCacambas, setQtdCacambas] = useState(1);
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valorUnitario || !data) return;
    const valorTotal = parseFloat(valorUnitario) * parseInt(qtdCacambas);
    const dadosDoVale = {
      ...pessoaSelecionada, valor: valorTotal.toFixed(2),
      qtdCacambas: parseInt(qtdCacambas) || 1, data, observacoes,
      idVale: new Date().getTime(),
    };
    onGerarVale(dadosDoVale);
    setValorUnitario(''); setQtdCacambas(1); setObservacoes('');
  };

  if (!pessoaSelecionada) {
    return <p className="aviso">Selecione uma pessoa para gerar um vale.</p>;
  }

  return (
    <div className="card">
      <h3>Gerar Vale para: {pessoaSelecionada.nome}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Valor por Caçamba (R$):</label>
          <input type="number" step="0.01" value={valorUnitario} onChange={(e) => setValorUnitario(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Quantidade de Caçambas:</label>
          <input type="number" min="1" step="1" value={qtdCacambas} onChange={(e) => setQtdCacambas(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Observações (Opcional):</label>
          <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Ex: Adiantamento, frete da NF 123..."></textarea>
        </div>
        <button type="submit" className="btn btn-success btn-full">Gerar Novo Vale</button>
      </form>
    </div>
  );
};
export default FormularioVale;
