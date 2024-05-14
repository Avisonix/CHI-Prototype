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
  /*sqlHandler('delete from roles where role_id > 5')
  sqlHandler('insert into cases (title, description, max_students, fk_status, fk_case_master, valid_from, valid_to) values ("Ny hjemmeside til CHI", "CHI vil gerne have den sejeste hjemmeside muligt", 10,2, 1,  strftime("%Y%m%d", "now"), 29991231)')
  sqlHandler('insert into cases (title, description, max_students, fk_status, fk_case_master, valid_from, valid_to) values ("Det her er også et eksempel", "Lorem ipsum", 10,1, 1, strftime("%Y%m%d", "now"), 29991231)')
  sqlHandler('insert into cases (title, description, max_students, fk_status, fk_case_master, valid_from, valid_to) values ("Nyt lagersystem til Forsvaret", "Forsvaret skal brgue en hjemmeside til at styre deres lageret", 10,2, 1, strftime("%Y%m%d", "now"), 29991231)')
  sqlHandler('insert into cases (title, description, max_students, fk_status, fk_case_master, valid_from, valid_to) values ("Nyt design til hjemmeside til KKIK", "Vi vil gerne have et nyt design til vores hjemmeside",10,2, 1, strftime("%Y%m%d", "now"), 29991231)')*/
  module.exports = sqlHandler;