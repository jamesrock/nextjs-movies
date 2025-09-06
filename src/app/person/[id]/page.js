import { fetch_options, tmdb_base, tmdb_media_base } from '@/app/api';
import Filmography from '@/app/components/Filmography';

export default async function Person({
  params
}) {
  const { id } = await params;
  const data = await fetch(tmdb_base + `/person/${id}?language=en-US`, fetch_options);
  const person = await data.json();
  console.log(person);
  return (
    <main>
      <div className="person">
        <h1>{person.name}</h1>
        <img className="poster" src={tmdb_media_base + person.profile_path} />
        <p className="bio">{person.biography}</p>
        <Filmography id={person.id} />
      </div>
    </main>
  );
}
