import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: Schema.Types.String,
      required: true, // this field is required
      unique: true, // no two users can have the same email
      trim: true, // removes whitespace from beginning and end of string
      lowercase: true, // converts string to lowercase
    },
    password: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      minLength: 6, // password must be at least 10 characters long
      maxLength: 100, // password cannot be longer than 100 characters
    },
  },
  {
    versionKey: false, // removes __v property from collection
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // automatically adds createdAt and updatedAt properties to collection
  }
);

export const User = mongoose.model("User", userSchema);
