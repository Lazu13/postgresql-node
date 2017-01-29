var express = require('express');
var router = express.Router();
const pg = require('pg');
var fs = require('fs');

const connectionString = (JSON.parse(fs.readFileSync('.conf', 'utf8'))).connection_string;

/* ZASOB DODAJ */
router.post('/zasob', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.zasobInsert($1,$2,$3)', [data.id_kategoria_zasob, data.stan_zasob, data.nazwa_zasob],
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(400);
                    res.send(JSON.stringify(err));
                    return;
                }

                console.log(result);

                client.end(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(400);
                        res.send(JSON.stringify(err));
                    }
                });
                res.send(JSON.stringify(result.rows));
            });
    });
});


module.exports = router;
