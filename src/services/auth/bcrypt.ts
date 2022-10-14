import bcrypt from "bcrypt";
import { UserProps } from "../user/user";

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function comparePassword(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

export function verifyInformations(user: UserProps) {
  if (!user.id || !user.email || !user.name || !user.password) {
    const response = { message: "Requested data not found" };
    return response;
  }
}
