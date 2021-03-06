const { Pool } = require("pg");  //This is all pretty much boilerplate, other than the URI

const PG_URI ="";

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  }
};
