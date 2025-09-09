import Search from './Search';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header>
      <div className="header-inner container">
        <Search />
        <Navigation />
      </div>
    </header>
  );
}
