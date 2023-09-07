import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    src: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false, // removes __v property from collection
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // automatically adds createdAt and updatedAt properties to collection
  }
);

export const File = mongoose.model("File", fileSchema);
