import { tmdb_media_base } from '@/app/api';

export default function Poster({
  path = null
}) {
  return (
    <div className="poster-crop">
      <img className="poster" src={path ? (tmdb_media_base + path) : path} />
    </div>
  );
}
