import express from "express";
import asyncHandler from "express-async-handler";
import * as db from "../dbcon.mjs";




const citiesRouter = express.Router();


// get all of the landfills for the user and region specified
citiesRouter.get(
    "/",
    asyncHandler(async (req, res) => {
      console.log("inside get Cities");
      let q = `SELECT Cities.city_id, Cities.city_name, States.name AS state
      FROM Cities
      INNER JOIN States ON Cities.state_id = States.state_id `;;
  
      db.pool.query(q, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
        } else {
          console.log(result);
          res.status(200).send(JSON.stringify(result));
        }
      });
    })
  );

  citiesRouter.put("/:city_id", asyncHandler(async (req, res) => {
    console.log(`Updating city with ID ${req.params.city_id}`);
    console.log(req.body)
    const { city_name, state_id } = req.body;
  
    if (!city_name || !state_id) {
      res.status(400).send("City name and state id are required");
      return;
    }

    console.log('here')
  
    const q = `UPDATE Cities SET city_name = ?, state_id = ? WHERE city_id = ?`;
    const values = [city_name, state_id, req.params.city_id];
  
    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else if (result.affectedRows === 0) {
        res.status(404).send("City not found");
      } else {
        res.status(200).send(`City with ID ${req.params.city_id} updated successfully`);
      }
    });
  }));


  citiesRouter.delete("/:city_id", asyncHandler(async (req, res) => {
    console.log(`Deleting city with ID ${req.params.city_id}`);
    const q = `DELETE FROM Cities WHERE city_id = ?`;
    const values = [req.params.city_id];
  
    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else if (result.affectedRows === 0) {
        res.status(404).send("City not found");
      } else {
        res.status(200).send(`City with ID ${req.params.city_id} deleted successfully`);
      }
    });
  }));


  citiesRouter.post("/", asyncHandler(async (req, res) => {
    console.log("Adding a new city");
    const { city_name, state_id } = req.body;
  
    if (!city_name || !state_id) {
      res.status(400).send("City name and state id are required");
      return;
    }
  
    const q = `INSERT INTO Cities (city_name, state_id) VALUES (?, ?)`;
    const values = [city_name, state_id];
  
    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        const newCityId = result.insertId;
        res.status(201).send(`New city added with ID ${newCityId}`);
      }
    });
  }));


export default citiesRouter;