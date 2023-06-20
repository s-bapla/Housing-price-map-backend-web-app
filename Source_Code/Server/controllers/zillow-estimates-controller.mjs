import express from "express";
import asyncHandler from "express-async-handler";
import * as db from "../dbcon.mjs";

const zillowEstimatesRouter = express.Router();

// Get all Zillow Estimates
zillowEstimatesRouter.get("/", asyncHandler(async (req, res) => {

  console.log('inside get zillow estimates')

  const q = `SELECT * FROM Zillow_Estimates`;

  db.pool.query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
}));

// Add a new Zillow Estimate
zillowEstimatesRouter.post("/", asyncHandler(async (req, res) => {
  const { zestimate, date, home_id } = req.body;

  if (!zestimate || !date) {
    res.status(400).send("Zestimate and date are required");
    return;
  }

  const q = `INSERT INTO Zillow_Estimates (zestimate, date, home_id) VALUES (?, ?, ?)`;
  const values = [zestimate, date, home_id];

  db.pool.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      const newZestimateId = result.insertId;
      res.status(201).send(`New Zillow Estimate added with ID ${newZestimateId}`);
    }
  });
}));

// Update a Zillow Estimate
zillowEstimatesRouter.put("/:zillow_price_id", asyncHandler(async (req, res) => {
  const { zestimate, date, home_id } = req.body;

  if (!zestimate || !date) {
    res.status(400).send("Zestimate and date are required");
    return;
  }

  const q = `UPDATE Zillow_Estimates SET zestimate = ?, date = ?, home_id = ? WHERE zillow_price_id = ?`;
  const values = [zestimate, date, home_id, req.params.zillow_price_id];

  db.pool.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else if (result.affectedRows === 0) {
      res.status(404).send("Zillow Estimate not found");
    } else {
      res.status(200).send(`Zillow Estimate with ID ${req.params.zillow_price_id} updated successfully`);
    }
  });
}));

// Delete a Zillow Estimate
zillowEstimatesRouter.delete("/:zillow_price_id", asyncHandler(async (req, res) => {
  const q = `DELETE FROM Zillow_Estimates WHERE zillow_price_id = ?`;
  const values = [req.params.zillow_price_id];

  db.pool.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else if (result.affectedRows === 0) {
      res.status(404).send("Zillow Estimate not found");
    } else {
      res.status(200).send(`Zillow Estimate with ID ${req.params.zillow_price_id} deleted successfully`);
    }
  });
}));

export default zillowEstimatesRouter;
