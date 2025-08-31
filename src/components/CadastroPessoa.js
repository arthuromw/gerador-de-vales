import React, { useState } from 'react';

const CadastroPessoa = ({ onAdicionarPessoa }) => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [placa, setPlaca] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !cnpj) {
      alert('Nome e CNPJ são obrigatórios!');
      return;
    }
    const novaPessoa = { id: new Date().getTime(), nome, cnpj, placa };
    onAdicionarPessoa(novaPessoa);
    setNome(''); setCnpj(''); setPlaca('');
  };

  return (
    <div className="card">
      <h3>Cadastrar Nova Pessoa</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Nome Completo:</label><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do Caminhoneiro" required /></div>
        <div className="form-group"><label>CNPJ:</label><input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0001-00" required /></div>
        <div className="form-group"><label>Placa Padrão (Opcional):</label><input type="text" value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} placeholder="ABC-1234" /></div>
        <button type="submit">Cadastrar Pessoa</button>
      </form>
    </div>
  );
};
export default CadastroPessoa;