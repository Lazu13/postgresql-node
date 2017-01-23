var express = require('express');
var router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/projekt';

/* GET home page. */
router.get('/', function (req, res) {
    const client = new pg.Client(connectionString);

    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * from projekt.zasob', function (err, result) {
            if (err) throw err;

            console.log(result);

            client.end(function (err) {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify(err));
                }
            });

            res.send(JSON.stringify(result.fields));

        });
    });
});

module.exports = router;
