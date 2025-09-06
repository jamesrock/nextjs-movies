import Category from './components/Category';
import Search from './components/Search';

export default async function Home() {
  return (
    <main>
      <Search />
      <div className="categories">
        <Category name="Latest Releases" />
        <Category id="Comedy" name="Comedy" />
        <Category id="Horror" name="Horror" />
        <Category id="Family" name="Family" />
        <Category id="Fantasy" name="Fantasy" />
        <Category id="Drama" name="Drama" />
        <Category id="Action" name="Action" />
        <Category id="Sci-Fi" name="Sci-Fi" />
      </div>
    </main>
  );
}
