import Link from 'next/link'
import {base} from '@/app/api';
import Filmography from '@/app/components/Filmography';

export default async function Director({
  params
}) {
  const { id } = await params;
  const data = await fetch(base + '/names/' + id);
  const director = await data.json();
  console.log(director);
  return (
    <main>
      <div className="director" key={director.id}>
        <h1>{director.displayName}</h1>
        <img className="poster" src={director?.primaryImage?.url} />
        <p>{director.biography}</p>
        <Filmography id={director.id} type="director" />
      </div>
    </main>
  );
}
