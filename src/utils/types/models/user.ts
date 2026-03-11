export type UserModelType = {
  _id?: string;
  role?: "normal" | "admin";
  status?: "loggedIn" | "registered" | "blocked";
  createAt?: Date;
  lastUpdate?: Date;
  firstSignup?: Date;
  lastGetUser?: Date;
  description?: string;
  password?: string;
  cpfOrRg?: string;
  images?: {
    profile?: string;
  };
  email?: string;
  order?: number;
  name?: string;
};