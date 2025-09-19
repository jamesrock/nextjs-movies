import { api } from '@/app/api';
import { Films } from '@/app/components';

export default async function NowPlaying() {
  const films = await api.getNowPlaying();
  return (
    <Films films={films.results} name="Now Playing" link="/playing" />
  );
}
