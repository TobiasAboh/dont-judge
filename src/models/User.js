import mongoose from "mongoose";

const convertDateToISO = () => {
  return new Date(Date.now() + 18 * 60 * 60 * 1000);
}


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  expiresAfter: { type: Date, default: convertDateToISO() },
  messages: [{ type: [String], default: [] }],
  timer: { type: Number, default: 1 },
  startTime: { type: Number, default: Date.now() },
  duration: { type: Number, default: 60 },// Default to 10 minutes from now
  // expiresAfter: { type: Date, default: Date.now() + 10},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export { UserSchema };
export default User;
