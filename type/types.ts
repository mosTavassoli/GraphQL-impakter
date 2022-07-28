interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

type UserInput = Pick<
  UserType,
  "email" | "firstName" | "lastName" | "username" | "password"
>;
type UserLoginInput = Pick<UserType, "email" | "password">;
type UserUpdateInput = Pick<UserType, "email" | "firstName" | "lastName">;
type authorizedUser = Pick<UserType, "_id" | "username">;
export { UserType, UserInput, UserUpdateInput, UserLoginInput, authorizedUser };
