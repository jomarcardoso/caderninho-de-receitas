import Link from 'next/link';
import './SideMenu.scss';

export default function SideMenu() {
  return (
    <div className="side-menu-container">
      <nav className="side-menu theme-primary">
        <Link href="/">PÃ¡gina inicial</Link>
        <Link href="/recipes">Receitas</Link>
      </nav>
    </div>
  );
}

