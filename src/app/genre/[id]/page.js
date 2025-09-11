import { genres } from '@/app/api';
import FilmGrid from '@/app/components/FilmGrid';

export default async function Genre({
  params
}) {
  const { id } = await params;
  return (
    <main>
      <FilmGrid id={id} name={genres[id]} />
    </main>
  );
}
