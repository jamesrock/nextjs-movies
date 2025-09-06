export const base = 'https://api.imdbapi.dev';

export const getRatingClass = (rating) => {
  if(rating===0) {return ''};
  if(rating>=8) {
    return 'high';
  }
  else if(rating>=4) {
    return 'mid';
  }
  else {
    return 'low';
  };
};

export const toTime = (time) => {
  const 
  h = Math.floor(time / 60),
  m = Math.floor(time % 60);
  return (h ? `${h}h ` : '') + (m ? `${m}m` : '');
};

export const fetch_options = {
  method: 'GET', 
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTcwMzdlNzI5ZWZlMTVmN2RiMzg0MTgyZDk5NjY3YiIsIm5iZiI6MTc1NzE1ODcxNC44OTkwMDAyLCJzdWIiOiI2OGJjMWQzYTUzODUwMTQ1MWI0ZTVhMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pdeAI0b67FCNnGHd7BFdpjphJQIJN1cfJ07Kkq8lznI'
  }
};
export const tmdb_base = 'https://api.themoviedb.org/3';
export const tmdb_media_base = 'https://image.tmdb.org/t/p/original';