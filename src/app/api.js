import roles from './roles';

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
export const getRole = (type, person) => {
  // console.log(`${type}/${mediaType}`, person);
  switch(type) {
    case 'credits/cast/movie':
    case 'filmography/cast/movie':
    case 'filmography/cast/tv':
      return joinFlatRoles(person.characters);
    case 'credits/cast/tv':
      return joinRoles(person.roles, 'character');
    case 'credits/crew/movie':
    case 'filmography/crew/movie':
    case 'filmography/crew/tv':
      return joinFlatRoles(person.jobs);
    case 'credits/crew/tv':
      return joinRoles(person.jobs, 'job');
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
export const flattenJobs = (people) => {
  const peopleWithOneJob = people.filter((person) => person.jobs.length===1).map((person) => {
    return {...person, job: person.jobs[0].job};
  });
  people.filter((person) => person.jobs.length>1).forEach((person) => {
    person.jobs.forEach((job) => {
      peopleWithOneJob.push({...person, job: job.job});
    });
  });
  return peopleWithOneJob;
};
export const filterSearch = (items) => {
  console.log(items);
  return items.filter((item) => {
    if(item.media_type==='person') {
      return item.known_for.length>1;
    }
    else {
      return true;
    };
  });
};
export const job_priority = {
  prop: 'job',
  priority: roles
};

export const department_priority = {
  prop: 'department',
  priority: [
    'Directing',
    'Writing',
    'Editing',
    'Production',
    'Crew',
    'Camera',
    'Sound',
    'Lighting',
    'Art',
    'Costume & Make-Up',
    'Visual Effects',
  ]
};

export const getProp = (collection, prop) => {
  return dedupe2(collection.map((item) => item[prop]));
};

export const dedupe2 = (data) => {
  const out = [];
  data.forEach((item) => {
    if(out.indexOf(item)===-1) {
      out.push(item);
    };
  });
  return out;
};

export const sortByPriority = (collection, sorter) => {
  const logged = [];
  return [...collection].sort((a, b) => {
    if(sorter.priority.indexOf(a[sorter.prop])===-1 && logged.indexOf(a[sorter.prop])===-1) {
      console.log(a[sorter.prop]);
      logged.push(a[sorter.prop]);
    };
    if(sorter.priority.indexOf(b[sorter.prop])===-1 && logged.indexOf(b[sorter.prop])===-1) {
      console.log(b[sorter.prop]);
      logged.push(b[sorter.prop]);
    };
    return sorter.priority.indexOf(a[sorter.prop])-sorter.priority.indexOf(b[sorter.prop]);
  });
};

export const genres = {};

export const setGenres = (data) => {
  data.forEach((genre) => {
    genres[genre.id] = genre.name;
  });
  console.log(genres);
};
