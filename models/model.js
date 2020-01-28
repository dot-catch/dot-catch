const { Pool } = require("pg");  //This is all pretty much boilerplate, other than the URI

const PG_URI =
  "postgres://hbyhdnmz:8wUFtgGrJesBTmJ5qNw--lQvg4k_cmoM@rajje.db.elephantsql.com:5432/hbyhdnmz";

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  }
};
