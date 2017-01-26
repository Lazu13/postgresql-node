var express = require('express');
var router = express.Router();
const pg = require('pg');
var fs = require('fs');

const connectionString = (JSON.parse(fs.readFileSync('.conf', 'utf8'))).connection_string;

/* TOP THREE CRIMES */
router.get('/crimes', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.top_przestepcy', function (err, result) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify(err));
                return;
            }

            console.log(result);

            client.end(function (err) {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify(err));
                }
            });
            res.send(JSON.stringify(result.rows));
        });
    });
});


/* TOP THREE OFFENSES */
router.get('/offenses', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.top_wykroczenia', function (err, result) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify(err));
                return;
            }

            console.log(result);

            client.end(function (err) {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify(err));
                }
            });
            res.send(JSON.stringify(result.rows));
        });
    });
});


/* TOP THREE POLICEMAN */
router.get('/policemen', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.top_policjanci', function (err, result) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify(err));
                return;
            }

            console.log(result);

            client.end(function (err) {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify(err));
                }
            });
            res.send(JSON.stringify(result.rows));
        });
    });
});

module.exports = router;
