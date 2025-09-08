import Search from './Search';
import Navigation from './Navigation';

export default async function Header() {
  return (
    <header>
      <div className="header-inner container">
        <Search />
        <Navigation />
      </div>
    </header>
  );
}
