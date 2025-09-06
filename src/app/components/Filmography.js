import Link from 'next/link'
import { base } from '@/app/api';

export default async function Filmography({
  id,
  type
}) {
  const data = await fetch(base + '/names/' + id + '/filmography?pageSize=50&categories=' + type);
  const json = await data.json();
  const films = json?.credits?.filter((credit) => credit.title.type==='movie') ?? [];
  console.log(films);
  return (
    <div className="filmography">
      <div className="filmography-items">
      {films.map((credit) => (
        <Link href={`/film/${credit.title.id}`} className="filmography-item" key={credit.title.id}>
          <div className="poster-crop">
            <img className="poster" src={credit.title.primaryImage?.url} />
          </div>
          <div className="name">{credit.title.primaryTitle}</div>
        </Link>
      ))}
      </div>
    </div>
  );
}
