
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


export interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export interface CodeChar {
  x: number;
  y: number;
  text: string;
}