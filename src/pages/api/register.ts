import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, username, password } = req.body;

    const existinguser = await prismadb.user.findUnique({
      where: {
        email
      }
    });

    if (existinguser)
      return res.status(409).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        name: username,
        image: ''
      }
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
