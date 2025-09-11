import FilmGrid from '@/app/components/FilmGrid';

export default async function Playing() {
  return (
    <main>
      <FilmGrid type="playing" name="Now Playing" />
    </main>
  );
}
