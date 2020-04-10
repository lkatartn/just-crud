import { NextApiRequest, NextApiResponse } from "next";
import { Client, query as fq } from "faunadb";
import { PAGE_SIZE } from "../../common/pagination";

const client = new Client({ secret: process.env.faunaDbSecret });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page = 1 } = req.query;
  const response = await client.query(
    fq.Map(
      fq.Paginate(fq.Documents(fq.Collection("employees")), {
        size: PAGE_SIZE,
      }),
      (d) => fq.Get(d)
    )
  );
  res.status(200).json(
    (response as any).data.map((el) => ({
      id: el.ref.id,
      ...el.data,
    }))
  );
};
