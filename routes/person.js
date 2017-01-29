var express = require('express');
var router = express.Router();
const pg = require('pg');
var fs = require('fs');

const connectionString = (JSON.parse(fs.readFileSync('.conf', 'utf8'))).connection_string;

/* POLICJANT */
router.get('/policeman/:personId', function (req, res) {
    const client = new pg.Client(connectionString);
    var personId = req.params.personId.toString();
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_policjant as fp where fp.id_dane_osobowe=\'' + personId + '\'', function (err, result) {
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

/* POLICJANT DODAJ */
router.post('/policeman/add/', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.policjantInsert($1,$2,$3,$4)', [data.currentId, data.currentRodzajSluzb.toString(), data.currentRanga.toString(), data.currentKomisariat.toString()],
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

/* POLICJANT ZASOB DODAJ */
router.post('/policeman_stuff/add/', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.policjantZasobInsert($1,$2,$3)', [data.id_zasob, data.id_kategoria_zasob, data.id_policjant],
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

/* POLICJANT ZASOB*/
router.get('/policeman_stuff/:policemanId', function (req, res) {
    const client = new pg.Client(connectionString);
    var policemanId = req.params.policemanId;
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_policjant_zasob as fpz where fpz.id_policjant=$1', [policemanId], function (err, result) {
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

/* OSOBA  */
router.get('/:personId', function (req, res) {
    const client = new pg.Client(connectionString);
    var personId = req.params.personId.toString();
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_osoba as fp where fp.id_dane_osobowe=\'' + personId + '\'', function (err, result) {
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

/* OSOBA WYKROCZENIA */
router.get('/offenses/:personId', function (req, res) {
    const client = new pg.Client(connectionString);
    var personId = req.params.personId.toString();
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_osoba_wykroczenie as fw where fw.id_dane_osobowe=\'' + personId + '\'', function (err, result) {
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


/* OSOBA PRZESTEPSTWA */
router.get('/crimes/:personId', function (req, res) {
    const client = new pg.Client(connectionString);
    var personId = req.params.personId.toString();
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_osoba_przestepstwo as fp where fp.id_dane_osobowe=\'' + personId + '\'', function (err, result) {
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

/* OSOBA DODAJ */
router.post('/add', function (req, res) {
    const client = new pg.Client(connectionString);
    const data = req.body;
    console.log(data);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT projekt.personInsert($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [data.name, data.surname, data.date, data.nationality, data.country, data.city,
                data.street, data.number, data.post_code],
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
