import { api } from '@/app/api';

export default function Poster({
  path = null,
  size = 'original'
}) {
  return (
    <div className="poster-crop">
      <img className="poster" src={api.getPosterPath(path, size)} />
    </div>
  );
}
