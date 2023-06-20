/*

IGNORE THIS FILE NOT APART OF CODE BASE

*/



// Database
import * as db from './dbcon.mjs';


const getHomeByCityId =  async (city_id) => {

    //let cityid = JSON.stringify(city_id)
    let query = 'SELECT Homes.home_id, Homes.street, Homes.sq_ft, Homes.num_of_bed, Homes.num_of_bath FROM Homes;';
    let result = []

    db.pool.query(query, (err, res) => {
        console.log(res)
        result = res
    })

    console.log(result)
    console.log("outside")
    console.log("")
    return result
}

export {getHomeByCityId}