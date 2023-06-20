import express from "express";
import asyncHandler from "express-async-handler";
import * as db from "../dbcon.mjs";

const regionStatsRouter = express.Router();

// Create new region statistic
regionStatsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      avg_price_per_sq_ft,
      mean_housing_price,
      five_year_price_gradient,
      ten_year_price_gradient,
      median_housing_price,
      date,
      region_id,
    } = req.body;

    const q = `INSERT INTO Region_Statistics (avg_price_per_sq_ft, mean_housing_price, five_year_price_gradient, ten_year_price_gradient, median_housing_price, date, region_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      avg_price_per_sq_ft,
      mean_housing_price,
      five_year_price_gradient,
      ten_year_price_gradient,
      median_housing_price,
      date,
      region_id,
    ];

    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
      }
      res.status(201).send(`New region statistic added with ID ${result.insertId}`);
    });
  })
);

// Get all region statistics
regionStatsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const q = `SELECT * FROM Region_Statistics`;

    db.pool.query(q, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
  })
);

// Update region statistic by ID
regionStatsRouter.put(
  "/:region_statistic_id",
  asyncHandler(async (req, res) => {
    const {
      avg_price_per_sq_ft,
      mean_housing_price,
      five_year_price_gradient,
      ten_year_price_gradient,
      median_housing_price,
      date,
      region_id,
    } = req.body;

    const q = `UPDATE Region_Statistics SET avg_price_per_sq_ft = ?, mean_housing_price = ?, five_year_price_gradient = ?, ten_year_price_gradient = ?, median_housing_price = ?, date = ?, region_id = ? WHERE region_statistic_id = ?`;
    const values = [
      avg_price_per_sq_ft,
      mean_housing_price,
      five_year_price_gradient,
      ten_year_price_gradient,
      median_housing_price,
      date,
      region_id,
      req.params.region_statistic_id,
    ];

    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
      }
      res
        .status(200)
        .send(`Region statistic with ID ${req.params.region_statistic_id} updated successfully`);
    });
  })
);

// Delete region statistic by ID
regionStatsRouter.delete(
  "/:region_statistic_id",
  asyncHandler(async (req, res) => {
    const q = `DELETE FROM Region_Statistics WHERE region_statistic_id = ?`;
    const values = [req.params.region_statistic_id];

    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
      }
      res
        .status(200)
        .send(`Region statistic with ID ${req.params.region_statistic_id} deleted successfully`);
    });
    })
    );
    
export default regionStatsRouter;
