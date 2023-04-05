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

  const isValidQuestion = Boolean(question) && question.length > 0;

  if (!isValidQuestion) {
    res.status(400).json({ answer: "Please enter a valid question" });
  }

  const llm = new OpenAI({ temperature: 0 });

  const appDataSource = new DataSource({
    type: "sqlite",
    database: "titanic.db",
  });

  const database = await SqlDatabase.fromDataSourceParams({
    appDataSource,
  });

  const chain = new SqlDatabaseChain({
    llm,
    database,
  });

  const data = await chain.run(question);
  res.status(200).json({ answer: data });
}
