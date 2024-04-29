const config = require("./dbConfig"),
  sql = require("mssql");

  
  const getUsers = async () => {
    try {
      let pool = await sql.connect(config);
      let users = await pool.request().query("SELECT * FROM Person");
      console.log(users);
      return users;
    } catch (err) {
      console.log(err);
    }
  };
  const getUser = async (userID) => {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().query(`SELECT * FROM Person WHERE PersonID = ${userID}`);
        return user;
    } catch (error) {
        console.log(error)
    }
  };
  const getUserByUserName = async (username, password) => {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().query(`SELECT * FROM Person WHERE CONVERT(varchar(50), [User Name])='${username}' AND Password='${password}';`);
        return user;
    } catch (error) {
        console.log(error)
    }
  };
  const getUserByUserNameWithoutPassword = async (username) => {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().query(`SELECT * FROM Person WHERE CONVERT(varchar(50), [User Name])='${username}';`);
        return user;
    } catch (error) {
        console.log(error)
    }
  };
  const createUser = async (User) => {
    try {
      let pool = await sql.connect(config);
      let user = pool.request().query(`INSERT INTO Person VALUES ('${User.username}', '${User.password}', '${User.role}', '${User.Email}')`);
      return user
    } catch (err) {
      console.log(err);
    }
  };
module.exports = { getUsers, getUser, createUser, getUserByUserName, getUserByUserNameWithoutPassword };
