import Link from 'next/link'
import { tmdb_media_base } from '@/app/api';

export default async function People({
  people,
  name,
  type
}) {
  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="category-items">
      {people.map((person, i) => (
        <Link href={`/person/${person.id}`} className="category-item" key={`person-${type}-${i}`}>
          <div className="poster-crop">
            <img className="poster" src={person.profile_path ? (tmdb_media_base + person.profile_path) : null} />
          </div>
          <div className="desc">
            <div className="desc-title">{person.name}</div>
            <div className="desc-role">{type==='cast' ? person.character : person.job}</div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
