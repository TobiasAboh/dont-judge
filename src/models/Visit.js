import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  _id: { type: String, default: 'site_visits' },
  count: { type: Number, default: 0 },
  confessions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

// Avoid model overwrite issues in Next.js
export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
