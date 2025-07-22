import bcrypt from 'bcryptjs';

const SALT = process.env.HASH_SALT!;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
