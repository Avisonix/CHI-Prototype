const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//function to handle sql queries. Accepts parameters to be used in place of ?
const sqlHandler = (sql, params) => {
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(path.resolve(__dirname, './model.sqlite'), (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log('Connected to the database.');
          db.serialize(() => {
            db.all(sql, params, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });
          });
          db.close((err) => {
            if (err) {
              console.error(err.message);
              reject(err);
            } else {
              console.log('Close the database connection.');
            }
          });
        }
      });
    });
  };
/*sqlHandler(`INSERT INTO users (name, email, password, gender, valid_from, valid_to, notification, fk_role) 
            VALUES ('John Doe', 'johndoe@example.com', 'password123', 1, strftime('%Y%m%d', 'now'), '29991231', 1, 1);`);*/
  //sqlHandler('SELECT * FROM sqlite_master').then((r)=>console.log(r)).catch((e)=>console.log(e));

module.exports = sqlHandler;