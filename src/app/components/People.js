import Link from 'next/link';
import { tmdb_media_base, getRole } from '@/app/api';

export default async function People({
  people,
  name,
  type
}) {
  console.log(people);
  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="category-items">
      {people.map((person) => (
        <Link href={`/person/${person.id}`} className="category-item" key={`${type}-${person.id}`}>
          <div className="poster-crop">
            <img className="poster" src={person.profile_path ? (tmdb_media_base + person.profile_path) : null} />
          </div>
          <div className="desc">
            <div className="desc-name">{person.name}</div>
            <div className="desc-role">{getRole(`credits/${type}`, person)}</div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
