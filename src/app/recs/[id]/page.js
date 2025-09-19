import { api } from '@/app/api';
import { FilmGrid } from '@/app/components';

export default async function Recs({
  params
}) {
  const { id } = await params;
  const film = await api.getFilm(id);
  return (
    <main>
      <FilmGrid id={id} type="recs" name="Recommendations" sub={`based on ${film?.title}`} />
    </main>
  );
}
