import Link from 'next/link';
import { getRole } from '@/app/api';
import Poster from './Poster';

export default function People({
  people,
  name,
  type
}) {
  console.log(people);
  return (
    !!people.length && <div className="category">
      <div className="category-head">
        <h2>{name}</h2>
      </div>
      <div className="category-items">
      {people.map((person) => (
        <Link href={`/person/${person.id}`} className="category-item" key={`${type}-${person.id}`}>
          <Poster path={person.profile_path} />
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
