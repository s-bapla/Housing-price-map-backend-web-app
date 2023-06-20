// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {errorHandler} from "./middleware";


type Data = {
  name: string;
};

// Database
var db = require("./db-connector");

export default async function asynchandler(
  req: NextApiRequest,
  res: NextApiResponse<Data | String>
) {
  if (req.method === "GET") {

    try{
      console.log("inside the db connector");
      // Define our queries
      const query1 = "DROP TABLE IF EXISTS diagnostic;";
      const query2 =
        "CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);";
      const query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
      const query4 = "SELECT * FROM diagnostic;";
  
      // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
  
      const conn = await db.pool.getConnection();
      console.log(conn)
      await conn.query(query1);
      await conn.query(query2);
      await conn.query(query3);
      const rows = await conn.query(query4);
  
      res.status(200).json(rows);
    }catch(err: any){
      // errorHandler(err , req, res);
      res.status(500).send('error connecting to db')
    }

  } else if (req.method === "POST") {
      res.status(200).send('going to post')
  } else {
    res.status(405).end();
  }
}
