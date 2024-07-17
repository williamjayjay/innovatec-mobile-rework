
export interface StudentDTO {
    id: string
    firstName: string
    lastName: string
    image: string
    email: string
    gender: string
    birthDate: string
    phone: string
    nationality: string
    address: string
  }
  
  interface UserName {
    title: string;
    first: string;
    last: string;
  }
  
  interface Street {
    number: number;
    name: string;
  }
  
  interface Coordinates {
    latitude: string;
    longitude: string;
  }
  
  interface Timezone {
    offset: string;
    description: string;
  }
  
  interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
  }
  
  interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }
  
  interface DOB {
    date: string;
    age: number;
  }
  
  interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }
  
  export interface UserApiResponse {
    gender: string;
    name: UserName;
    location: Location;
    email: string;
    login: Login;
    dob: DOB;
    phone: string;
    picture: Picture;
    nat: string;
  }
  
  export interface RandomUserAPIResponse {
    results: UserApiResponse[];
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  }
  