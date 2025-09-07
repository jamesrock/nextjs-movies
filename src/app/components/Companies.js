import Link from 'next/link';

export default async function Companies({
  companies
}) {
  return (
    <div className="companies">
      <h2>Companies</h2>
      <div className="companies-items">
      {companies.map((company) => (
        <Link href={`/company/${company.id}`} className="company" key={`${company.id}`}>
          {company.name}
        </Link>
      ))}
      </div>
    </div>
  );
}
