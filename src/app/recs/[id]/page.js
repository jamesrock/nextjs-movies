import FilmGrid from '@/app/components/FilmGrid';

export default async function Recs({
  params
}) {
  const { id } = await params;
  return (
    <main>
      <FilmGrid id={id} type="recs" />
    </main>
  );
}
