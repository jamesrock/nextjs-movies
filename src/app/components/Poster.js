import { getPosterPath } from '@/app/api';

export default function Poster({
  path = null,
  size = 'original'
}) {
  return (
    <div className="poster-crop">
      <img className="poster" src={getPosterPath(path, size)} />
    </div>
  );
}
