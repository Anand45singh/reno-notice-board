import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const notices = await prisma.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(notices);
  }

  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: error.message,
      });
    }
  }

  return res.status(405).end();
}