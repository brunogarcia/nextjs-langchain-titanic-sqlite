// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains";

type Data = {
  answer: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    question: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const { question } = req.body;

  const noValidQuestion = !question || question.length === 0;

  if (noValidQuestion) {
    res.status(400).json({ answer: "No question provided" });
  }

  const datasource = new DataSource({
    type: "sqlite",
    database: "titanic.db",
    synchronize: true,
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({ temperature: 0 }),
    database: db,
  });

  const data = await chain.run(question);
  res.status(200).json({ answer: data });
}