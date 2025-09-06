import Category from './components/Category';
import Search from './components/Search';

export default async function Home() {
  return (
    <main>
      <Search />
      <div className="categories">
        <Category name="Latest Releases" />
        <Category name="Comedy" id="35" />
        <Category name="Horror" id="27" />
        <Category name="Family" id="10751" />
        <Category name="Action" id="28" />
        <Category name="Sci-Fi" id="878" />
        <Category name="Drama" id="18" />
      </div>
    </main>
  );
}
