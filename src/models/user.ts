import { model, models, Schema } from "mongoose";

export interface IUser {
  created_at: Date;
  password: String;
  email: String;
}

const UserSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
