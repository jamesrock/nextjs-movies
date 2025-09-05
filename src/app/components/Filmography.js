import Link from 'next/link'
import {base} from '@/app/api';

export default async function Filmography({
  id,
  type
}) {
  const data = await fetch(base + '/names/' + id + '/filmography?pageSize=50&categories=' + type);
  const films = await data.json();
  console.log(films);
  return (
    <div className="filmography">
      {films?.credits?.map((credit) => (
        <Link href={`/film/${credit.title.id}`} className="film" key={credit.title.id}>
          <img className="poster" src={credit.title.primaryImage?.url} />
          <div>{credit.title.primaryTitle}</div>
        </Link>
      ))}
    </div>
  );
}
