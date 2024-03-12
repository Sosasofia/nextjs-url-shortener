import { model, models, Schema } from "mongoose";

export interface IUrl {
  original_url: String;
  short_url: String;
  visit_count: Number;
}

const UrlSchema = new Schema<IUrl>({
  original_url: String,
  short_url: String,
  visit_count: Number,
});

const Url = models.Url || model("Url", UrlSchema);

export default Url;
