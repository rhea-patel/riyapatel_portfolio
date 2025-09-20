
export interface About {
  name: string;
  role: string;
  location: string;
  summary: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Skills {
  category: string;
  items: string[];
  
}

export interface Project {
  id: number;
  title: string;
  description: string;
  Link?: string;
}

// export interface Employment {
//   company: string;
//   role: string;
//   location: string;
//   duration: string;
//   description: string[];
// }

export interface Education {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  details: string[];
}


export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
