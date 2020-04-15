import { NextApiRequest, NextApiResponse } from "next";
import { Client, query as fq } from "faunadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return;
  try {
    var { firstName, lastName, isActive, department } = JSON.parse(req.body);
  } catch (e) {
    return res.send(400);
  }
  const client = new Client({ secret: process.env.FAUNDADB_TOKEN });
  const resp = await client.query(
    fq.Create(fq.Collection("employees"), {
      data: { firstName, lastName, isActive, department },
    })
  );
  res.statusCode = 200;

  res.send(resp);
};
