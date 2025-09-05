import Link from 'next/link'
import {base} from '@/app/api';
import Filmography from '@/app/components/Filmography';

export default async function Actor({
  params
}) {
  const { id } = await params;
  const data = await fetch(base + '/names/' + id);
  const actor = await data.json();
  console.log(actor);
  return (
    <main>
      <div className="actor" key={actor.id}>
        <h1>{actor.displayName}</h1>
        <img className="poster" src={actor?.primaryImage?.url} />
        <p>{actor.biography}</p>
        <Filmography id={actor.id} type="actor" />
      </div>
    </main>
  );
}
