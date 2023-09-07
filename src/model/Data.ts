import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    about: {
      type: Schema.Types.String,
      trim: true,
    },
    firstName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true, // this field is required
      unique: true, // no two users can have the same email
      trim: true, // removes whitespace from beginning and end of string
      lowercase: true, // converts string to lowercase
    },
    phone: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    country: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    city: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    address1: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    address2: {
      type: Schema.Types.String,
      trim: true,
    },
    pin: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    state: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    avatar: {
      type: Schema.Types.String,
      trim: true,
      ref: "File",
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    skills: [
      {
        type: Schema.Types.String,
        trim: true,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    geolocation: {
      type: Schema.Types.String,
      trim: true,
      required: true,
    },
  },
  {
    versionKey: false, // removes __v property from collection
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // automatically adds createdAt and updatedAt properties to collection
  }
);

export const Data = mongoose.model("Data", dataSchema);
