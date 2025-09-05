import Category from './components/Category';

export default async function Home() {
  return (
    <main>
      <div className="categories">
        <Category name="Latest releases" />
        <Category id="Comedy" name="Comedy" />
        <Category id="Horror" name="Horror" />
        <Category id="Family" name="Family" />
      </div>
    </main>
  );
}
