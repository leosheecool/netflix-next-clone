import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { User } from '@prisma/client';

const setFavorite = async (movieId: string, favorite: boolean, user: User) => {
  const movie = await prismadb.movie.findUnique({
    where: {
      id: movieId
    }
  });

  if (!movie) throw new Error('Movie not found');

  if (movie) {
    await prismadb.user.update({
      where: {
        id: user.id
      },
      data: {
        favoriteIds: favorite
          ? [...user.favoriteIds, movie.id]
          : user.favoriteIds.filter((id) => id !== movie.id)
      }
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const user = await serverAuth(req);
      const movies = await prismadb.movie.findMany({
        where: {
          id: {
            in: user.currentUser.favoriteIds
          }
        }
      });
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const user = await serverAuth(req);
      const { movieId, favorite } = req.body;
      await setFavorite(movieId, favorite, user.currentUser);
      return res.status(200).json({ message: 'favorite modified' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  return res.status(405).end();
};

export default handler;
