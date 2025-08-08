import bcrypt from 'bcryptjs';

const SALT = parseInt(process.env.HASH_SALT!) || 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
