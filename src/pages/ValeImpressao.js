import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ValeImpressao.css';

const ValeImpressao = () => {
  const { idVale } = useParams();
  const valesSalvos = localStorage.getItem('valesGerados');
  const vales = valesSalvos ? JSON.parse(valesSalvos) : [];
  const vale = vales.find(v => v.idVale.toString() === idVale);

  if (!vale) { return ( <div className="vale-impressao-container"><h2>Vale não encontrado</h2><Link to="/">Voltar</Link></div> ); }

  const valorUnitario = vale.qtdCacambas > 0 ? parseFloat(vale.valor) / vale.qtdCacambas : 0;
  const formatarData = (dataISO) => { if (!dataISO) return ''; const [ano, mes, dia] = dataISO.split('-'); return `${dia}/${mes}/${ano}`; };
  const formatarValor = (valor) => { return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };

  const ViaDoVale = ({ titulo }) => (
    <div className="vale-box">
      <h4>{titulo}</h4>
      <div className="info-header"><p><strong>Código:</strong> {vale.codigo}</p><p><strong>Data de Emissão:</strong> {formatarData(vale.data)}</p></div>
      <p><strong>Beneficiário:</strong> {vale.nome}</p>
      <p><strong>CNPJ:</strong> {vale.cnpj}</p>
      <div className="detalhamento-valor"><p><strong>Placa do Veículo:</strong> {vale.placa}</p><p><strong>Quantidade de Caçambas:</strong> {vale.qtdCacambas}</p><p><strong>Valor Unitário:</strong> {formatarValor(valorUnitario)}</p></div>
      <div className="vale-valor"><p><strong>VALOR TOTAL: {formatarValor(parseFloat(vale.valor))}</strong></p></div>
      <div className="vale-assinatura"><p>_________________________</p><p>Assinatura do Responsável</p></div>
    </div>
  );

  return (
    <div className="vale-impressao-container">
      <ViaDoVale titulo="--- VIA DO CLIENTE ---" />
      <div className="separador-vias"></div>
      <ViaDoVale titulo="--- VIA DE CONTROLE ---" />
      <div className="botoes-acao"><button onClick={() => window.print()}>Imprimir Vias</button><button onClick={() => window.close()}>Fechar Aba</button></div>
    </div>
  );
};
export default ValeImpressao;