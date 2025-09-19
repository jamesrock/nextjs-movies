import { FilmGrid } from '@/app/components';

export default async function Playing() {
  return (
    <main>
      <FilmGrid type="playing" name="Now Playing" />
    </main>
  );
}
