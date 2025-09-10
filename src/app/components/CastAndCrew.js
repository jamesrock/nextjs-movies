import { dedupe, sortByPriority, api } from '@/app/api';
import People from './People';

export default async function CastAndCrew({
  id
}) {
  const people = await api.getCredits(id);
  return (
    <div className="cast-and-crew">
      <People people={dedupe(people.cast, 'cast')} name="Cast" type="cast" />
      <People people={dedupe(sortByPriority(people.crew, 'job'), 'crew')} name="Crew" type="crew" />
    </div>
  );
}
