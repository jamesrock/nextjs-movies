import { api } from '@/app/api';
import Films from './Films';

export default async function Recommendations({
  id
}) {
  const films = await api.getRecommendations(id);
  return (
    <Films films={films.results} name="Recommendations" link={`/recs/${id}`} />
  );
}
