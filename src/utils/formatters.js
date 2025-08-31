export const formatarData = (dataISO) => {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
};

export const formatarValor = (valor) => {
  const numero = parseFloat(valor);
  if (isNaN(numero)) return '';
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};