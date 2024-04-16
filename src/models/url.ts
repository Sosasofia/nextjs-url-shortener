import { model, models, Schema, Types } from "mongoose";

export interface IUrl {
  original_url: String;
  short_url: String;
  visit_count: Number;
  user_email: String;
}

const UrlSchema = new Schema<IUrl>(
  {
    original_url: String,
    short_url: String,
    visit_count: Number,
    user_email: String,
  },
  { timestamps: true }
);

const Url = models.Url || model("Url", UrlSchema);

export default Url;
