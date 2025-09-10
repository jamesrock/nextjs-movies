import { api } from '@/app/api';
import Films from './Films';

export default async function ComingSoon() {
  const films = await api.getComingSoon();
  return (
    <Films films={films.results} name="Coming Soon" />
  );
}
