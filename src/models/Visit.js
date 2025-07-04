import mongoose from "mongoose";

const convertDateToISO = (duration) => {
  return new Date(Date.now() + duration * 1000);
}

const VisitSchema = new mongoose.Schema({
  _id: { type: String, default: 'site_visits' },
  expiresAfter: { type: Date, default: convertDateToISO(86400) },
  count: { type: Number, default: () => Math.floor(Math.random() * 91) + 10 },
  confessions: { type: Number, default: 0 },

});

// Avoid model overwrite issues in Next.js
export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
