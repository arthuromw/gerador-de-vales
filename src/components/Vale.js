import React from 'react';

// Este componente recebe os dados do vale via props
const Vale = ({ dados }) => {
  // Se não houver dados, não renderiza nada
  if (!dados) {
    return null;
  }

  // Função para formatar a data para o padrão brasileiro
  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="vale-container">
      <h3>--- VALE DE CONTROLE FINANCEIRO ---</h3>
      <p><strong>ID do Vale:</strong> {dados.id}</p>
      <p><strong>Data:</strong> {formatarData(dados.data)}</p>
      <p><strong>CNPJ:</strong> {dados.cnpj}</p>
      <p><strong>Placa do Veículo:</strong> {dados.placa}</p>
      <div className="vale-valor">
        <p><strong>VALOR:</strong> R$ {dados.valor}</p>
      </div>
      <div className="vale-assinatura">
        <p>_________________________</p>
        <p>Assinatura do Responsável</p>
      </div>
    </div>
  );
};

export default Vale;
