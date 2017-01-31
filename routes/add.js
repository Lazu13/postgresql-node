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

/* WYKROCZENIE DODAJ */
router.post('/offense', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    if (data.grzywna == undefined)
        data.grzywna = null;
    if (data.ograniczenie == undefined)
        data.ograniczenie = null;
    if (data.wiezienie == undefined)
        data.wiezienie = null;
    console.log(data);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.offenseInsert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);',
            [data.rule, data.opis, data.nagana, data.grzywna, data.ograniczenie, data.wiezienie, data.date,
                data.country, data.city, data.street, data.number, data.post_code],
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

/* WYKROCZENIE-OSOBA DODAJ */
router.post('/offensePerson', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    if (data.zaklad == undefined)
        data.zaklad = null;
    if (data.date == undefined)
        data.date = null;
    if (data.dateTo == undefined)
        data.dateTo = null;
    console.log(data);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.offensePersonInsert($1,$2,$3,$4,$5,$6);',
            [data.id, data.idW, data.policjant, data.zaklad, data.date, data.dateTo],
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

/* PRZESTEPSTWO DODAJ */
router.post('/crime', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    if (data.grzywna == undefined)
        data.grzywna = null;
    if (data.wiezienie == undefined)
        data.wiezienie = null;
    console.log(data);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.crimeInsert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
            [data.rule, data.opis, data.grzywna, data.wiezienie, data.date,
                data.country, data.city, data.street, data.number, data.post_code],
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


/* PRZESTEPSTWO-OSOBA DODAJ */
router.post('/crimePerson', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    if (data.zaklad == undefined)
        data.zaklad = null;
    if (data.date == undefined)
        data.date = null;
    if (data.dateTo == undefined)
        data.dateTo = null;
    console.log(data);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.crimePersonInsert($1,$2,$3,$4,$5,$6);',
            [data.id, data.idW, data.policjant, data.zaklad, data.date, data.dateTo],
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
