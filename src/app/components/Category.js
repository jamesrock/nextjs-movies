import { genres, api } from '@/app/api';
import Films from './Films';

export default async function Category({
  id
}) {
  const films = await api.getCategory(id);
  return (
    <Films films={films.results} name={genres[id]} link={`/genre/${id}`} />
  );
}
