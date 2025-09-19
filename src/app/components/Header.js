import { Search, Navigation } from '@/app/components';

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
