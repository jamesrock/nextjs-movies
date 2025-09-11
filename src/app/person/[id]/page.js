import { api } from '@/app/api';
import Filmography from '@/app/components/Filmography';
import Poster from '@/app/components/Poster';

export default async function Person({
  params
}) {
  const { id } = await params;
  const person = await api.getPerson(id);
  // console.log(person);
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
