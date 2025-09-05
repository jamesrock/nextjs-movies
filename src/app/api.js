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

export const toTime = (s) => {
  const 
  h = Math.floor(s / 3600),
  m = Math.floor(s % 3600 / 60);
  return `${h}h ${m}m`;
};
