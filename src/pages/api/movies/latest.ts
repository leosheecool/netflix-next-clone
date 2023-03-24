import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await serverAuth(req);

    const latestMovies = await prismadb.movie.findMany({
      take: 10
    });

    return res.status(200).json(latestMovies);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default handler;
