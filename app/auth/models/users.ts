export interface Credentials {
    username: string;
    password: string;
  }
  
  export interface User {
    name: string;
  }
  

  export interface AuthedUser {
    name: string;
    profileType: string;
    session: string;
  }