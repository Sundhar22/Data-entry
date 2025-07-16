import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export async function getAuthCommissioner() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = verifyToken(token) as { id: string; email: string };
    return decoded;
  } catch (err) {
    return null;
  }
}
