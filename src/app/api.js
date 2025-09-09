import roles from './roles';

export const tmdb_base = 'https://api.themoviedb.org/3';
export const tmdb_media_base = 'https://image.tmdb.org/t/p/original';
export const fetch_options = {
  method: 'GET', 
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTcwMzdlNzI5ZWZlMTVmN2RiMzg0MTgyZDk5NjY3YiIsIm5iZiI6MTc1NzE1ODcxNC44OTkwMDAyLCJzdWIiOiI2OGJjMWQzYTUzODUwMTQ1MWI0ZTVhMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pdeAI0b67FCNnGHd7BFdpjphJQIJN1cfJ07Kkq8lznI'
  }
};

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

export const dedupe = (collection, type) => {
  const out = [];
  collection.forEach((item) => {
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

export const dedupeFilms = (films) => {
  return dedupeByProp(films, 'id');
};

export const dedupeByProp = (collection, prop) => {
  const out = [];
  collection.forEach((item) => {
    if(out.filter((title) => title[prop]===item[prop]).length===0) {
      out.push(item);
    };
  });
  return out;
};

export const dedupeFlat = (collection) => {
  const out = [];
  collection.forEach((item) => {
    if(isMissing(out, item)) {
      out.push(item);
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

export const filterFilms = (collection) => {
  // return collection;
  return collection.filter((item) => item.media_type==='movie');
};

const toFilter = [
  'person',
  'movie'
];

export const filterSearch = (collection) => {
  return collection.filter((item) => toFilter.indexOf(item.media_type)>-1);
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
  return dedupeFlat(collection.map((item) => item[prop]));
};

export const sortByPriority = (collection, sorter) => {
  flagMissingSortItems(collection, sorter);
  return [...collection].sort((a, b) => {
    return sorter.priority.indexOf(a[sorter.prop])-sorter.priority.indexOf(b[sorter.prop]);
  });
};

export const addProp = (collection, prop, value) => {
  return collection.map((item) => {return {...item, [prop]: value}});
};

export const sortByProp = (collection, prop) => {
  return collection.sort((a, b) => {
    return b[prop]-a[prop];
  });
};

export const filterByMatch = (collection, q) => {
  const reg = new RegExp(q, 'i');
  return collection.filter((item) => item[media_type_name[item.media_type]].search(reg)===0);
};

const flagMissingSortItems = (collection, sorter) => {
  const logged = [];
  collection.forEach((item) => {
    if(isMissing(sorter.priority, item[sorter.prop]) && isMissing(logged, item[sorter.prop])) {
      console.log(item[sorter.prop]);
      logged.push(item[sorter.prop]);
    };
  });
  return logged;
};

const isMissing = (collection, prop) => {
  return collection.indexOf(prop)===-1;
};

export const genres = {};

export const setGenres = (data) => {
  data.forEach((genre) => {
    genres[genre.id] = genre.name;
  });
  console.log(genres);
};

setGenres([
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]);
