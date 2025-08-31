// src/pages/PaginaEditarVale.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaginaEditarVale = ({ vales, onEditarVale }) => {
  const { idVale } = useParams(); // Pega o ID do vale da URL
  const navigate = useNavigate(); // Para redirecionar após salvar

  // Estados para os campos do formulário
  const [valorUnitario, setValorUnitario] = useState('');
  const [qtdCacambas, setQtdCacambas] = useState(1);
  const [data, setData] = useState('');
  const [placa, setPlaca] = useState('');
  const [valeParaEditar, setValeParaEditar] = useState(null);

  // Efeito para carregar os dados do vale no formulário quando a página abre
  useEffect(() => {
    const vale = vales.find(v => v.idVale.toString() === idVale);
    if (vale) {
      setValeParaEditar(vale);
      // Calcula o valor unitário a partir do total salvo
      setValorUnitario((parseFloat(vale.valor) / vale.qtdCacambas).toFixed(2));
      setQtdCacambas(vale.qtdCacambas);
      setData(vale.data);
      setPlaca(vale.placa || '');
    } else {
      alert("Vale não encontrado!");
      navigate('/consultar'); // Volta se o vale não existir
    }
  }, [idVale, vales, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const valorTotal = parseFloat(valorUnitario) * parseInt(qtdCacambas);

    const dadosAtualizados = {
      valor: valorTotal.toFixed(2),
      qtdCacambas: parseInt(qtdCacambas),
      data,
      placa,
    };

    onEditarVale(valeParaEditar.idVale, dadosAtualizados);
    alert("Vale atualizado com sucesso!");
    navigate('/consultar'); // Redireciona para a página de consulta
  };

  if (!valeParaEditar) {
    return <p>Carregando dados do vale...</p>;
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>Editando Vale: {valeParaEditar.codigo}</h3>
      <p>Beneficiário: {valeParaEditar.nome}</p>
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
          <label>Placa do Veículo:</label>
          <input type="text" value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default PaginaEditarVale;