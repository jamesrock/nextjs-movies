import Link from 'next/link'
import {base} from '@/app/api';

export default async function Category({
  id,
  name
}) {
  const data = await fetch(base + '/titles?types=MOVIE' + (id ? `&genres=${id}` : ''));
  const films = await data.json();
  console.log(films);
  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="category-items">
      {films?.titles?.length && films?.titles?.map((film) => (
        <Link href={`/film/${film.id}`} className="category-item" key={film.id}>
          <div className="poster-crop">
            <img className="poster" src={film.primaryImage?.url} />
          </div>
          <div className="name">{film.primaryTitle}</div>
        </Link>
      ))}
      </div>
    </div>
  );
}
