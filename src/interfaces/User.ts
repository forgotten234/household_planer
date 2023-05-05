import {Document} from 'mongoose';
interface User extends Document {
  first_name?: string;
  second_name?: string;
  user_name: string;
  email: string;
  password: string;
  role?: string;
}

interface UserTest {
  first_name?: string;
  second_name?: string;
  id?: string;
  user_name?: string; // returned from graphql is snake_case
  userName?: string; // graphql variables are camelCase
  email?: string;
  password?: string;
  token?: string;
}

interface UserIdWithToken {
  id: string;
  token: string;
  role: string;
}

export {User, UserTest, UserIdWithToken};
