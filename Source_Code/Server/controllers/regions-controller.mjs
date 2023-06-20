import express from "express";
import asyncHandler from "express-async-handler";
import * as db from "../dbcon.mjs";

const regionsRouter = express.Router();


regionsRouter.post(
    "/",
    asyncHandler(async (req, res) => {
        console.log('inside add region')
      const { region_name, region_description, cities } = req.body;
  
      if (!region_name || !region_description) {
        res.status(400).send("Region name and description are required");
        return;
      }
  
      // Insert the new region into the Regions table
      const q = `INSERT INTO Regions (region_name, region_description) VALUES (?, ?)`;
      const values = [region_name, region_description];
  
      db.pool.query(q, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
          return;
        }
  
        console.log(`New region added with ID ${result.insertId}`);
  
        // Add cities to the Region_has_Cities table, if provided
        if (cities && cities.length > 0) {
          const q2 = `INSERT INTO Region_has_Cities (city_id, region_id) 
                      SELECT Cities.city_id, ? FROM Cities WHERE Cities.city_name IN (?)`;
          const values2 = [result.insertId, cities];
  
          db.pool.query(q2, values2, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(err.message);
              return;
            }
  
            console.log(
              `Added cities to new region with ID ${result.insertId}`
            );
          });
        }
  
        res.status(201).send(`New region added with ID ${result.insertId}`);
      });
    })
  );
  
  

// get all regions
regionsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("inside get Regions");
    let q = `SELECT Regions.region_id, Regions.region_name, Regions.region_description, 
           GROUP_CONCAT(Cities.city_name) AS cities
           FROM Regions
           LEFT JOIN Region_has_Cities ON Regions.region_id = Region_has_Cities.region_id
           LEFT JOIN Cities ON Region_has_Cities.city_id = Cities.city_id
           GROUP BY Regions.region_id`;

    db.pool.query(q, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        console.log(result);
        const regions = result.map((region) => ({
          region_id: region.region_id,
          region_name: region.region_name,
          cities: region.cities ? region.cities.split(",") : [],
          region_description: region.region_description,
        }));

        res.status(200).send(JSON.stringify(regions));
      }
    });
  })
);

regionsRouter.put(
  "/:region_id",
  asyncHandler(async (req, res) => {
    console.log(`Updating region with ID ${req.params.region_id}`);
    const { region_name, region_description, cities } = req.body;

    if (!region_name || !region_description) {
      res.status(400).send("Region name and description are required");
      return;
    }

    // Update the region name and description
    const q = `UPDATE Regions SET region_name = ?, region_description = ? WHERE region_id = ?`;
    const values = [region_name, region_description, req.params.region_id];

    db.pool.query(q, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
      }

      console.log(
        `Region with ID ${req.params.region_id} updated successfully`
      );

      // Delete all cities associated with the region
      const q2 = `DELETE FROM Region_has_Cities WHERE region_id = ?`;
      const values2 = [req.params.region_id];

      db.pool.query(q2, values2, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
          return;
        }

        console.log(
          `Deleted existing cities associated with region ${req.params.region_id}`
        );

        // Add new cities associated with the region
        const q3 = `INSERT INTO Region_has_Cities (city_id, region_id) 
                    SELECT Cities.city_id, ? FROM Cities WHERE Cities.city_name IN (?)`;
        const values3 = [req.params.region_id, cities];

        db.pool.query(q3, values3, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
          }

          console.log(
            `Added new cities associated with region ${req.params.region_id}`
          );

          res
            .status(200)
            .send(
              `Region with ID ${req.params.region_id} updated successfully`
            );
        });
      });
    });
  })
);

regionsRouter.delete(
    "/:region_id",
    asyncHandler(async (req, res) => {
      console.log(`Deleting region with ID ${req.params.region_id}`);
  
      // Delete all cities associated with the region
      const q1 = `DELETE FROM Region_has_Cities WHERE region_id = ?`;
      const values1 = [req.params.region_id];
  
      db.pool.query(q1, values1, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
          return;
        }
  
        console.log(
          `Deleted all cities associated with region ${req.params.region_id}`
        );
  
        // Delete the region
        const q2 = `DELETE FROM Regions WHERE region_id = ?`;
        const values2 = [req.params.region_id];
  
        db.pool.query(q2, values2, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
          }
  
          console.log(`Deleted region with ID ${req.params.region_id}`);
  
          res
            .status(200)
            .send(`Region with ID ${req.params.region_id} deleted successfully`);
        });
      });
    })
  );
  

export default regionsRouter;
