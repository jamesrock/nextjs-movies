import { fetch_options, tmdb_base, tmdb_media_base } from '@/app/api';

export default async function Company({
  params
}) {
  const { id } = await params;
  const data = await fetch(tmdb_base + `/company/${id}?language=en-US`, fetch_options);
  const company = await data.json();
  console.log(company);
  return (
    <main>
      <div className="film">
        <div className="film-head">
          <div className="film-head-top">
            <h1>{company?.name}</h1>
            <div className="duration">{company?.headquarters}</div>
          </div>
        </div>
        <div className="poster-crop">
          <img className="poster" src={company.logo_path ? (tmdb_media_base + company.logo_path) : null} />
        </div>
        <p className="plot">{company?.overview}</p>
      </div>
    </main>
  );
}
