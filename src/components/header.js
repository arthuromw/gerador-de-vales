import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return { title: 'Dashboard', breadcrumb: 'Início' };
  
  const page = parts[0];
  switch (page) {
    case 'gerar':
      return { title: 'Gerar Vale', breadcrumb: 'Início > Gerar Vale' };
    case 'consultar':
      return { title: 'Consultar Vales', breadcrumb: 'Início > Consultar' };
    case 'cadastrar':
      return { title: 'Gerenciar Pessoas', breadcrumb: 'Início > Cadastrar' };
    case 'fechamento-dia':
      return { title: 'Fechamento do Dia', breadcrumb: 'Início > Fechamento' };
    case 'editar-vale':
      return { title: 'Editar Vale', breadcrumb: 'Início > Consultar > Editar' };
    default:
      return { title: 'Sistema de Vales', breadcrumb: 'Início' };
  }
};

const Header = () => {
  const location = useLocation();
  const { title, breadcrumb } = getPageTitle(location.pathname);

  // Atualiza o título da aba do navegador
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <header className="App-header">
      <div className="header-content">
        <Link to="/" className="header-title-link">
          <h1>Sistema Gerador de Vales</h1>
        </Link>
        <p className="breadcrumb">{breadcrumb}</p>
      </div>
    </header>
  );
};

export default Header;