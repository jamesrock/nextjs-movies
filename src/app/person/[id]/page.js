import { api } from '@/app/api';
import { Poster, Filmography } from '@/app/components';

export default async function Person({
  params
}) {
  const { id } = await params;
  const person = await api.getPerson(id);
  return (
    <main>
      <div className="person">
        <h1>{person.name}</h1>
        <Poster path={person.profile_path} />
        <p className="bio">{person.biography}</p>
        <Filmography id={person.id} />
      </div>
    </main>
  );
}
