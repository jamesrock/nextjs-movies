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
      return getFilmographyRole(type, person);
  };
};
export const getFilmographyRole = (type, person) => {
  return type==='cast' ? joinFlatRoles(person.characters) : joinFlatRoles(person.jobs);
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
  priority: [
    'Director',
    'Writer',
    'Screenplay',
    'Original Film Writer',
    'Story',
    'Novel',
    'Graphic Novel',
    'Editor',
    'Online Editor',
    'Assistant Editor',
    'Director of Photography',
    'Colorist',
    'Production Assistant',
    'First Assistant Director',
    'Second Assistant Director',
    'Second Second Assistant Director',
    'Third Assistant Director',
    'Assistant Director',
    'Additional Second Assistant Director',
    'Head of Production',
    'Executive Producer',
    'Co-Executive Producer',
    'Executive Producer\'s Assistant',
    'Production Supervisor',
    'Producer',
    'Producer\'s Assistant',
    'Line Producer',
    'Casting',
    'Casting Associate',
    'Casting Assistant',
    'Creative Director',
    'Production Design',
    'Set Decoration',
    'Assistant Set Decoration',
    'Prop Maker',
    'Dolly Grip',
    'Aerial Director of Photography',
    'Set Dresser',
    'On Set Dresser',
    'Set Designer',
    'Key Set Costumer',
    'Set Costumer',
    'Art Direction',
    'Production Sound Mixer',
    'Sound Mixer',
    'Steadicam Operator',
    'Script Supervisor',
    'Key Costumer',
    'Researcher',
    'Fight Choreographer',
    'Special Effects Technician',
    'Special Effects Coordinator',
    'Special Effects Supervisor',
    'Special Effects',
    'Animation Supervisor',
    'Compositors',
    'CG Supervisor',
    'VFX Supervisor',
    'Actor\'s Assistant',
    'Boom Operator',
    'Stunt Coordinator',
    'Hair Supervisor',
    'Digital Intermediate Producer',
    'Video Assist Operator',
    'Digital Intermediate Editor',
    'Associate Editor',
    'Negative Cutter',
    'Costume Supervisor',
    'Hairstylist',
    'Still Photographer',
    'Makeup Designer',
    'Songs',
    'CG Artist',
    'Assistant Makeup Artist',
    'VFX Artist',
    'Draughtsman',
    'Costume Design',
    'Principal Costumer',
    'Prosthetic Makeup Artist',
    'Visual Effects Supervisor',
    'Visual Effects Producer',
    'Visual Effects Coordinator',
    'Visual Effects Editor',
    'Visual Effects',
    'Key Grip',
    'Grip',
    'Gaffer',
    'Principal Costumer',
    'Production Manager',
    'Unit Production Manager',
    'Makeup Supervisor',
    'Key Makeup Artist',
    'Makeup Artist',
    'Set Buyer',
    'Makeup Effects Designer',
    'Modeling',
    'Special Effects Makeup Artist',
    'Post Production Producer',
    'Pyrotechnician',
    'Additional Production Sound Mixer',
    'Digital Intermediate Colorist',
    'Production Intern',
    'Underwater Camera',
    'Mix Technician',
    'Visual Development',
    'Libra Head Technician',
    'Assistant Art Director',
    'Stunts',
    'Stunt Driver',
    'Co-Producer',
    'Property Master',
    'Assistant Property Master',
    'Second Unit Director',
    'Sound Designer',
    'Foley Supervisor',
    'Foley Artist',
    'Foley Editor',
    'Foley Mixer',
    'Foley Recordist',
    'Sound Designer',
    'Foley',
    'Supervising Sound Editor',
    'Sound Editor',
    'Sound Re-Recording Mixer',
    'Choreographer',
    'Hair Designer',
    'Title Designer',
    '"A" Camera Operator',
    '"B" Camera Operator',
    'First Assistant "A" Camera',
    'Second Assistant "A" Camera',
    'First Assistant "B" Camera',
    'Second Assistant "B" Camera',
    'Second Unit Director of Photography',
    'Original Music Composer',
    'Art Department Coordinator',
    'Graphic Designer',
    'Prosthetics',
    'First Assistant Sound Editor',
    'Assistant Sound Editor',
    'Sound Effects Editor',
    'Sound Effects Designer',
    'Scoring Mixer',
    'Additional Editing',
    'Set Decorating Coordinator',
    'Book',
    'Associate Producer',
    'Makeup Department Head',
    'Hair Department Head',
    'Prosthetic Supervisor',
    'Scenic Artist',
    'Leadman',
    'Greensman',
    'Supervising ADR Editor',
    'ADR Supervisor',
    'ADR & Dubbing',
    'ADR Editor',
    'ADR Mixer',
    'ADR Recordist',
    'ADR Voice Casting',
    'Construction Coordinator',
    'Wigmaker',
    'Post Production Supervisor',
    'Supervising Art Director',
    'Utility Stunts',
    'Second Unit First Assistant Director',
    'Conceptual Illustrator',
    'Driver',
    'Costume Designer',
    'Standby Art Director',
    'Digital Imaging Technician',
    'Wardrobe Master',
    'Additional Sound Re-Recording Mixer',
    'Costume Coordinator',
    'Assistant Costume Designer',
    'Digital Intermediate',
    'Music Supervisor',
    'Music Editor',
    'Music Coordinator',
    'Music',
    'Dailies Technician',
    'Clapper Loader',
    'Transportation Captain',
    'Transportation Co-Captain',
    'Transportation Coordinator',
    'Supervising Dialogue Editor',
    'Production Accountant',
    'First Assistant Accountant',
    'Post Production Accountant',
    'Post Coordinator',
    'Digital Effects Supervisor',
    'Best Boy Grip',
    'In Memory Of',
    '3D Supervisor',
    'Key Hair Stylist',
    'Chief Lighting Technician',
    'Animal Coordinator',
    'Production Runner',
    'Dialogue Editor',
    'Utility Sound',
    'Stunt Double',
    'Dialect Coach',
    'Dialogue Coach',
    'Location Manager',
    'Camera Operator',
    'Rigging Grip',
    'Rigging Gaffer',
    'First Assistant Camera',
    'Assistant Camera',
    'Electrician',
    'Lighting Technician',
    'Executive Music Producer',
    'Set Production Assistant',
    'Set Medic',
    'Unit Publicist',
    'Main Title Designer',
    'Sculptor',
    'Color Timer',
    'Extras Casting',
    'Storyboard Artist',
    'First Assistant Editor',
    'Assistant Sound Engineer',
    'Second Assistant Camera',
    'Pilot',
    'Production Coordinator',
    'Compositing Supervisor',
    'Compositor',
    'Aerial Coordinator',
    'Sound Recordist',
    'Supervising Armorer',
    'Armorer',
    'Production Secretary',
    'Supervising Music Editor',
    'First Assistant Makeup Artist',
    'Ager/Dyer',
    'Standby Painter',
    'Costume Standby',
    'Costume Assistant',
    'Author',
    'First Assistant Art Direction',
    'Sound Mix Technician',
    'Textile Artist',
    'Wardrobe Assistant',
    'Hair Assistant',
    'Costumer',
    'Construction Foreman',
    'Concept Artist',
    'Orchestrator',
    'Hairdresser',
    'Prosthetic Designer',
    'Underwater Director of Photography',
    'Props',
    'Location Sound Mixer',
    'Consulting Editor',
    'Dressing Prop',
    'Art Department Assistant',
    'Local Casting',
    'Focus Puller',
    'Carpenter',
    'Construction Manager',
    'Marine Coordinator',
    'Assistant Production Manager',
    'Unit Manager',
    'Sound Assistant',
    'Special Effects Manager',
    'Drone Pilot',
    'First Assistant "C" Camera',
    'Assistant Production Coordinator',
    'First Company Grip',
    'Executive Visual Effects Producer',
    'Digital Effects Producer',
    'Makeup Effects',
    'Visual Effects Camera',
    'Dolby Consultant',
    'Best Boy Electric',
    'Key Rigging Grip',
    'Generator Operator',
    'Tailor',
    'Set Decoration Buyer',
    'Assistant Chief Lighting Technician',
    'Makeup & Hair',
    'Additional Script Supervisor',
    'Visual Effects Designer',
    'Loader',
    'Additional Editor',
    'Post Production Coordinator',
    'Digital Compositor',
    'Compositing Artist',
    'Location Coordinator',
    'Additional Production Assistant',
    'Editorial Production Assistant',
    'Second Assistant Accountant',
    'Assistant Location Manager',
    'Studio Teacher',
    'Production Controller',
    'Production Driver',
    'Additional Grip',
    'Additional First Assistant Camera',
    'Additional Second Assistant Camera',
    'Key Set Production Assistant',
    'Lighting Programmer',
    'Visual Effects Production Manager',
    'Extras Casting Coordinator',
    'Location Assistant',
    'Lighting Artist',
    'Additional Music',
    'Executive In Charge Of Production',
    'Contact Lens Technician',
    'Painter',
    'Music Consultant',
    'Additional Camera',
    'Motion Capture Artist',
    'Conceptual Design',
    'Legal Services',
    'Animation',
    'Animation Director',
    'Visual Effects Art Director',
    'Senior Modeller',
    'Craft Service',
    'Payroll Accountant',
    'Camera Production Assistant',
    '24 Frame Playback',
    'Editorial Staff',
    'Set Dressing Artist',
    'Finance',
    'Production Office Assistant',
    'Techno Crane Operator',
    'Aerial Camera',
    'Aerial Camera Technician',
    'BTS Photographer',
    'Camera Loader',
    'Epk Camera Operator',
    'Second Assistant "C" Camera',
    'Russian Arm Operator',
    'Extras Casting Assistant',
    'Digital Intermediate Assistant',
    'Publicist',
    'Travel Coordinator',
    'Comic Book',
    'Senior Visual Effects Supervisor',
    'Post Producer',
    'Senior Animator',
    'Security',
    'Location Scout',
    'Picture Car Coordinator',
    'Stand In',
    'Other',
    'Thanks',
  ]
};

export const department_priority = {
  prop: 'department',
  priority: [
    'Sound',
    'Crew',
    'Costume & Make-Up',
    'Production',
    'Directing',
    'Art',
  ]
};

export const getProp = (collection, prop) => {
  return dedupe2(collection.map((item) => item[prop]));
};

export const dedupe2 = (data) => {
  const out = [];
  data.forEach((item) => {
    if(out.filter((title) => title===item).length===0) {
      out.push(item);
    };
  });
  return out;
};

export const sortByPriority = (collection, sorter) => {
  const logged = [];
  return collection.sort((a, b) => {
    if(sorter.priority.indexOf(a[sorter.prop])===-1 && logged.indexOf(a[sorter.prop])===-1) {
      console.log(a[sorter.prop]);
      logged.push(a[sorter.prop]);
    };
    return sorter.priority.indexOf(a[sorter.prop])-sorter.priority.indexOf(b[sorter.prop]);
  });
};