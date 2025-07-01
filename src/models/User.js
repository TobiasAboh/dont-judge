import mongoose from "mongoose";

const convertDateToISO = (duration) => {
  return new Date(Date.now() + duration * 1000);
}


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  expiresAfter: { type: Date, default: convertDateToISO(3600) },
  messages: [{ type: [String], default: [] }],
  timer: { type: Number, default: 1 },
  startTime: { type: Number, default: Date.now() },
  duration: { type: Number, default: 3600 },// Default to 10 minutes from now
  // expiresAfter: { type: Date, default: Date.now() + 10},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export { UserSchema };
export default User;
