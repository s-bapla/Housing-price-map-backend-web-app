--- Data definition file ---
--- project Group: 83 ---

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- create States
CREATE OR REPLACE TABLE States (
    state_id INT(10) NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(80) NOT NULL,
    PRIMARY KEY (state_id)
);


-- create Cities
CREATE OR REPLACE TABLE Cities (
    city_id INT(10) NOT NULL AUTO_INCREMENT UNIQUE,
    city_name VARCHAR(80) NOT NULL,
    state_id INT(10) NOT NULL,
    PRIMARY KEY (city_id),
    FOREIGN KEY (state_id) REFERENCES States (state_id) ON DELETE CASCADE
);

-- create Homes
CREATE OR REPLACE TABLE Homes (
    home_id INT(10) AUTO_INCREMENT UNIQUE,
    street VARCHAR(80) NOT NULL,
    zip VARCHAR(45) NOT NULL,
    sq_ft INT(10) NOT NULL,
    num_of_bed INT(10) NOT NULL,
    num_of_bath INT(10) NOT NULL,
    year_built INT(4) NOT NULL,
    lat DECIMAL(6,3) NOT NULL,
    lng DECIMAL(6,3) NOT NULL,
    city_id INT(10) NOT NULL,
    PRIMARY KEY (home_id),
    FOREIGN KEY (city_id) REFERENCES Cities (city_id) ON DELETE CASCADE
);

-- create Zillow_Estimates
CREATE OR REPLACE TABLE Zillow_Estimates (
    zillow_price_id INT AUTO_INCREMENT UNIQUE NOT NULL,
    zestimate DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    home_id INT(10),
    PRIMARY KEY (zillow_price_id),
    FOREIGN KEY (home_id) REFERENCES Homes (home_id) ON DELETE SET NULL
);


-- create Regions
CREATE OR REPLACE TABLE Regions (
    region_id INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
    region_name VARCHAR(80),
    region_description VARCHAR(180) NOT NULL,
    PRIMARY KEY (region_id)
);

-- create Region_Statistics
CREATE OR REPLACE TABLE Region_Statistics (
    region_statistic_id INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
    avg_price_per_sq_ft DECIMAL(10,2) NOT NULL,
    mean_housing_price DECIMAL(10,2) NOT NULL,
    five_year_price_gradient DECIMAL(10,2) NOT NULL,
    ten_year_price_gradient DECIMAL(10,2) NOT NULL,
    median_housing_price DECIMAL(10,2) NOT NULL,
    date DATE,
    region_id INT(10) NOT NULL,
    PRIMARY KEY (region_statistic_id),
    FOREIGN KEY (region_id) REFERENCES Regions (region_id) ON DELETE CASCADE
);

-- create Region_Statistics_has_Cities
CREATE OR REPLACE TABLE Region_has_Cities (
    region_has_cities_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    city_id INT(10) NOT NULL,
    region_id INT(10) NOT NULL,
    PRIMARY KEY (region_has_cities_id),
    FOREIGN KEY (city_id) REFERENCES Cities (city_id) ,
    FOREIGN KEY (region_id) REFERENCES Regions (region_id) 
);

-- insert sample data into states
INSERT INTO States (name)
VALUES ('California'),
       ('New York'),
       ('Texas'),
       ('Illinois');

-- insert sample data into Cities
INSERT INTO Cities (city_name, state_id)
VALUES ('San Francisco', (SELECT state_id FROM States WHERE name = 'California')),
       ('New York', (SELECT state_id FROM States WHERE name = 'New York')),
       ('Berkley', (SELECT state_id FROM States WHERE name = 'California')),
       ('Los Angeles', (SELECT state_id FROM States WHERE name = 'California')),
       ('Chicago', (SELECT state_id FROM States WHERE name = 'Illinois'));

-- insert sample data into Homes
INSERT INTO Homes (street, sq_ft, num_of_bed, num_of_bath, year_built, lat, lng, zip, city_id)
VALUES
  ('123 Main St', 1200, 2, 1, 1990, 37.123, -122.456, 94107, (SELECT city_id FROM Cities WHERE city_name = 'San Francisco')),
  ('456 Elm St', 1500, 3, 2, 1980, 40.789, -73.012, 10001, (SELECT city_id FROM Cities WHERE city_name = 'New York')),
  ('789 Oak St', 1700, 4, 3, 1970, 34.567, -118.91, 90001, (SELECT city_id FROM Cities WHERE city_name = 'Los Angeles')),
  ('246 Birch St', 1300, 3, 1, 2000, 41.876, -87.654, 60601, (SELECT city_id FROM Cities WHERE city_name = 'Chicago'));

-- insert sample data into Zillow_Estimates
INSERT INTO Zillow_Estimates (zestimate, date, home_id)
VALUES
  (2245681, '2022-01-01', (SELECT home_id FROM Homes WHERE home_id = 1)),
  (1245341, '2022-01-01', (SELECT home_id FROM Homes WHERE home_id = 2)),
  (1245481, '2022-01-01', (SELECT home_id FROM Homes WHERE home_id = 3)),
  (7245681, '2022-01-01', (SELECT home_id FROM Homes WHERE home_id = 4));

INSERT INTO Regions (region_name, region_description)
VALUES
    ('Bay Area', 'Placeholder'),
    ('New York', 'Placeholder'),
    ('Texas Triangle', 'Placeholder');

-- insert sample data into Region_has_Cities
INSERT INTO Region_has_Cities (region_id, city_id)
VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (3, 4);

-- insert sample data into Region_Statistics
INSERT INTO Region_Statistics (region_id, avg_price_per_sq_ft, mean_housing_price, five_year_price_gradient, ten_year_price_gradient, median_housing_price, date)
VALUES
    (1, 500, 800000, 0.05, 0.1, 700000, '2022-01-01'),
    (2, 600, 900000, 0.06, 0.12, 800000, '2022-01-01'),
    (1, 400, 700000, 0.04, 0.08, 600000, '2022-01-01'),
    (3, 300, 600000, 0.03, 0.06, 500000, '2022-01-01');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;