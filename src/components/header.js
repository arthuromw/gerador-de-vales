import React from 'react';
import { useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return { title: 'Dashboard' };
  
  const page = parts[0];
  switch (page) {
    case 'gerar': return { title: 'Gerar Vale' };
    case 'consultar': return { title: 'Consultar Vales' };
    case 'cadastrar': return { title: 'Gerenciar Pessoas' };
    case 'fechamento-dia': return { title: 'Fechamento do Dia' };
    case 'editar-vale': return { title: 'Editar Vale' };
    default: return { title: 'Sistema de Vales' };
  }
};

const Header = ({ onMenuToggle }) => {
  const location = useLocation();
  const { title } = getPageTitle(location.pathname);

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <header className="App-header">
      <button className="mobile-menu-button" onClick={onMenuToggle} aria-label="Abrir menu">
        ☰
      </button>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
