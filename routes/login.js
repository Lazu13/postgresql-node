var express = require('express');
var router = express.Router();
const pg = require('pg');
var fs = require('fs');

const connectionString = (JSON.parse(fs.readFileSync('.conf', 'utf8'))).connection_string;

/* LOGIN */
router.post('/', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.uzytkownik as u WHERE u.nazwa_uzytkownika=\'' + data.username.toString() +
            '\' AND u.haslo_uzytkownika=\'' + data.password.toString() + '\';', function (err, result) {
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
