export const getRatingClass = (rating) => {
  if(rating===0) {return ''};
  if(rating>=7) {
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
export const media_type_name = {
  'tv': 'name',
  'movie': 'title',
  'person': 'name'
};
export const media_type_profile_path = {
  'tv': 'poster_path',
  'movie': 'poster_path',
  'person': 'profile_path'
};
export const media_type_credits_path = {
  'movie': 'credits',
  'tv': 'aggregate_credits'
};
const joinRoles = (roles, key) => {
  return roles.map((role) => role[key]||'Unknown').join(', ');
};
const joinFlatRoles = (roles) => {
  return roles.map((role) => role||'Unknown').join(', ');
};
export const getRole = (type, mediaType, person) => {
  switch(mediaType) {
    case 'tv':
      return type==='cast' ? joinRoles(person.roles, 'character') : joinRoles(person.jobs, 'job');
    case 'movie':
      return type==='cast' ? joinFlatRoles(person.characters) : joinFlatRoles(person.jobs);
  };
};
export const floorRating = (rating) => {
  return Math.floor(rating * 10) / 10;
};
const dedupe_type_map = {
  'crew': {
    'target': 'job',
    'plural': 'jobs'
  },
  'cast': {
    'target': 'character',
    'plural': 'characters'
  }
};
export const dedupe = (data, type) => {
  const out = [];
  data.forEach((item) => {
    const found = out.filter((title) => title.id===item.id);
    if(found.length>0) {
      found[0][dedupe_type_map[type]['plural']].push(item[dedupe_type_map[type]['target']]);
    }
    else {
      out.push({[dedupe_type_map[type]['plural']]: [item[dedupe_type_map[type]['target']]], ...item});
    };
  });
  return out;
};