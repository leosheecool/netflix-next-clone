import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const { movieId } = req.query;

  try {
    await serverAuth(req);

    if (!movieId) throw new Error('Movie id not provided');

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId as string
      }
    });

    if (!movie) throw new Error('Movie not found');

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default handler;
