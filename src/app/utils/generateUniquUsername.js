// utils/generateUniqueUsername.js
import User from "@/models/User";

export async function generateUniqueUsername(baseUsername) {
  let username = baseUsername;
  let suffix = 0;

  while (await User.findOne({ username })) {
    suffix++;
    username = `${baseUsername}${suffix}`;
  }

  return username;
}
