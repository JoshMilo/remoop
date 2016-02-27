const r = require('rethinkdb');
const async = require('async');

const createDb = (next) => {
  r.connect((err, conn) => {
    r.dbCreate('music').run(conn, (err, res) => {
      conn.close();
      next(err, res);
    });
  });
};

const createTable = (name, next) =>  {
  r.connect({db: 'music'}, (err, conn) => {
    r.tableCreate(name).run(conn, (err,res) => {
      conn.close();
      next(err, res);
    });
  });
};

const createTables = (next) => {
  async.map(['artists', 'invoices'], createTable, next);
};

async.series({
  created: createDb,
  tables: createTables
}, (err, res) => console.log(res));
