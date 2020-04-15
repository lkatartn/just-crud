import { NextApiRequest, NextApiResponse } from "next";
import { Client, query as fq } from "faunadb";
import { PAGE_SIZE } from "../../common/pagination";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = +(req.query?.page || 1);
  const client = new Client({ secret: process.env.FAUNDADB_TOKEN });
  const response = await client.query(
    fq.Map(
      fq.Paginate(fq.Documents(fq.Collection("employees")), {
        size: 10000,
      }),
      (d) => fq.Get(d)
    )
  );
  res.status(200).json({
    data: (response as any).data
      .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      .map((el) => ({
        id: el.ref.id,
        ...el.data,
      })),
    elementsCount: (response as any).data.length,
  });
};
