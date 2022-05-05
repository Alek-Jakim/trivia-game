import bcrypt from "bcrypt"

export const passwordMatch = async (password, userPass) => await bcrypt.compare(password, userPass);