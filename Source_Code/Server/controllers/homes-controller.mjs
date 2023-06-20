import express from "express";
import asyncHandler from "express-async-handler";
import * as db from "../dbcon.mjs";

const homesRouter = express.Router();

/*
    ROUTES for Homes
*/

homesRouter.get(
  "/all_homes",
  asyncHandler(async (req, res) => {
    console.log("inside get homes");
    let city_id = req.params.city_id;

    let q = `SELECT * FROM Homes INNER JOIN Cities on Homes.city_id = Cities.city_id;`;

    db.pool.query(q, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).send(JSON.stringify(result));
      }
    });
  })
);

homesRouter.get(
  "/:city_id",
  asyncHandler(async (req, res) => {
    console.log("inside get homes");
    let city_id = req.params.city_id;

    let q = `SELECT * FROM Homes INNER JOIN Cities on Homes.city_id = Cities.city_id WHERE Homes.city_id=${city_id};`;

    db.pool.query(q, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).send(JSON.stringify(result));
      }
    });
  })
);

homesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log("inside posting home");

    let q = `INSERT INTO Homes (street, sq_ft, num_of_bed, num_of_bath, year_built, lat, lng, zip, city_id) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, (SELECT Cities.city_id FROM Cities WHERE city_name = ?))`;

    console.log(q);

    db.pool.query(
      q,
      [
        req.body.street,
        req.body.sq_ft,
        req.body.num_of_bed,
        req.body.num_of_bath,
        req.body.year_built,
        req.body.lat,
        req.body.lng,
        req.body.zip,
        req.body.city_name,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
        } else {
          res.status(204).send(JSON.stringify(result));
        }
      }
    );
  })
);

homesRouter.put("/:home_id", asyncHandler(async (req, res) => {
  console.log(`Updating home with ID ${req.params.home_id}`);
  const homeId = parseInt(req.params.home_id);
  console.log(req.body)
  const { street, sq_ft, num_of_bed, num_of_bath, year_built, lat, lng, zip, city_name } = req.body;
  console.log(street)

  if (!street || !sq_ft || !num_of_bed || !num_of_bath || !year_built || !lat || !lng || !zip || !city_name) {
    res.status(400).send("All fields are required");
    return;
  }

  const q = `UPDATE Homes SET 
    street = ?, 
    sq_ft = ?, 
    num_of_bed = ?, 
    num_of_bath = ?, 
    year_built = ?, 
    lat = ?, 
    lng = ?, 
    zip = ?, 
    city_id = (SELECT Cities.city_id FROM Cities WHERE city_name = ?) 
    WHERE home_id = ?`;
    
  const values = [street, sq_ft, num_of_bed, num_of_bath, year_built, lat, lng, zip, city_name, homeId];
  console.log('about to make update')

  db.pool.query(q, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send(`Home with ID ${homeId} not found`);
      return;
    }
    console.log(`Updated home with ID ${homeId}`);
    res.status(200).send(`Home with ID ${homeId} updated successfully`);
  });
}));

homesRouter.delete(
  "/",
  asyncHandler(async (req, res) => {
    console.log("inside delete home");
    let home_id = req.query.home_id;

    let q = `DELETE FROM Homes \
      WHERE Homes.home_id = ${home_id};`;

    db.pool.query(q, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        res.status(204).send(JSON.stringify(result));
      }
    });
  })
);

export default homesRouter;
