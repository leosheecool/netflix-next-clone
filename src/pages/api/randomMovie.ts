import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await serverAuth(req);

    const movieCount = await prismadb.movie.count();
    const random = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      skip: random,
      take: 1
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default handler;
