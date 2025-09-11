import roles from './roles';

const tmdb_base = 'https://api.themoviedb.org/3';
const tmdb_media_base = 'https://image.tmdb.org/t/p';
const fetch_options = {
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

export const largest_size_map = {
  'movie': 'w780',
  'person': 'h632'
};

const joinFlatRoles = (roles) => {
  return roles.map((role) => role||'Unknown').join(', ');
};

export const getRole = (type, person) => {
  // console.log(`getRole[${type}]`, person);
  switch(type) {
    case 'cast':
      return joinFlatRoles(person.characters);
    case 'crew':
      return joinFlatRoles(person.jobs);
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
    const found = out.find((title) => title.id===item.id);
    if(found) {
      found[dedupe_type_map[type]['plural']].push(item[dedupe_type_map[type]['target']]);
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

const sorters = {
  'job': roles
};

export const sortByPriority = (collection, sorter) => {
  flagMissingSortItems(collection, sorter);
  return [...collection].sort((a, b) => {
    return sorters[sorter].indexOf(a[sorter])-sorters[sorter].indexOf(b[sorter]);
  });
};

export const getProp = (collection, prop) => {
  return dedupeFlat(collection.map((item) => item[prop]));
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
    if(isMissing(sorters[sorter], item[sorter]) && isMissing(logged, item[sorter])) {
      console.log(item[sorter]);
      logged.push(item[sorter]);
    };
  });
  return logged;
};

const isMissing = (collection, prop) => {
  return collection.indexOf(prop)===-1;
};

export const getPosterPath = (path, size) => {
  return path ? (tmdb_media_base + `/${size}` + path) : null;
};

export const genres = {};

const setGenres = (data) => {
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

export const api = {
  getFilmography: async function(id) {
    const data = await fetch(tmdb_base + `/person/${id}/movie_credits`, fetch_options);
    const films = await data.json();
    return films;
  },
  getCredits: async function(id) {
    const data = await fetch(tmdb_base + `/movie/${id}/credits`, fetch_options);
    const people = await data.json();
    return people;
  },
  getCategory: async function(id) {
    const data = await fetch(tmdb_base + `/discover/movie?region=GB&sort_by=popularity.desc&with_release_type=2%7C3&with_genres=${id}`, fetch_options);
    const films = await data.json();
    return films;
  },
  getNowPlaying: async function() {
    const data = await fetch(tmdb_base + '/movie/now_playing?region=GB', fetch_options);
    const films = await data.json();
    return films;
  },
  getComingSoon: async function() {
    const data = await fetch(tmdb_base + '/movie/upcoming?region=GB', fetch_options);
    const films = await data.json();
    return films;
  },
  getRecommendations: async function(id) {
    const data = await fetch(tmdb_base + `/movie/${id}/recommendations?region=GB`, fetch_options);
    const films = await data.json();
    return films;
  },
  getGenres: async function() {
    const data = await fetch(tmdb_base + '/genre/movie/list', fetch_options);
    const genres = await data.json();
    return genres;
  },
  getFilm: async function(id) {
    const data = await fetch(tmdb_base + `/movie/${id}`, fetch_options);
    const film = await data.json();
    return film;
  },
  getPerson: async function(id) {
    const data = await fetch(tmdb_base + `/person/${id}`, fetch_options);
    const person = await data.json();
    return person;
  },
  search: function(query) {
    return Promise.all([
      fetch(tmdb_base + `/search/movie?query=${query}`, fetch_options), 
      fetch(tmdb_base + `/search/person?query=${query}`, fetch_options)
    ]).then(responses => {
      return Promise.all(responses.map((response) => response.json()));
    });
  },
  getFilms: async function(type, page, id) {
    let path = '';
    switch(type) {
      case 'recs':
        path = (tmdb_base + `/movie/${id}/recommendations?page=${page}region=GB`);
      break;
      case 'genre':
        path = (tmdb_base + `/discover/movie?with_genres=${id}&page=${page}&region=GB&sort_by=popularity.desc&with_release_type=2%7C3`);
      break;
    };
    return fetch(path, fetch_options).then(response => response.json());
  }
};
