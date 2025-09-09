import Link from 'next/link';

export default function Genres({
  genres
}) {
  console.log(genres);
  return (
    <div className="genres">{genres.map((genre) => <Link href={`/genre/${genre.id}`} key={genre.id}>{genre.name}</Link>)}</div>
  );
}
