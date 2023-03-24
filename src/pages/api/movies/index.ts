import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { Prisma } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const { orderBy, take, genre, search, favorite } = req.query;

  try {
    const user = await serverAuth(req);

    const or: Prisma.Enumerable<Prisma.MovieWhereInput> = search
      ? {
          OR: [
            {
              title: { contains: search as string }
            },
            {
              description: { contains: search as string }
            }
          ]
        }
      : {};

    const and: Prisma.Enumerable<Prisma.MovieWhereInput> = {
      AND: [
        favorite
          ? {
              id: {
                [favorite === 'true' ? 'in' : 'notIn']:
                  user.currentUser.favoriteIds
              }
            }
          : {},
        genre
          ? {
              genre: {
                has: genre as string
              }
            }
          : {}
      ]
    };

    console.log(and);

    const order = orderBy !== null ? (orderBy as 'asc' | 'desc') : undefined;

    const movies = await prismadb.movie.findMany({
      where: {
        ...or,
        ...and
      },
      take: Number(take) || undefined,
      orderBy: {
        updatedAt: order
      }
    });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default handler;
