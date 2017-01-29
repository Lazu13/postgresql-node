var express = require('express');
var router = express.Router();
const pg = require('pg');
var fs = require('fs');

const connectionString = (JSON.parse(fs.readFileSync('.conf', 'utf8'))).connection_string;

/* RANGA */
router.get('/ranga', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.ranga;', function (err, result) {
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

/* RODZAJ SLUZB */
router.get('/rodzaj_sluzb', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.rodzaj_sluzb;', function (err, result) {
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

/* KOMISARIAT */
router.get('/komisariat', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.komisariat;', function (err, result) {
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

/* ZASOB */
router.get('/zasob', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.zasob;', function (err, result) {
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

/* KATEGORIA ZASOB */
router.get('/kategoria_zasob', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.kategoria_zasob;', function (err, result) {
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

/* Policjanci */
router.get('/policjant', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.policjant;', function (err, result) {
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



/* OSOBY */
router.get('/people', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_osoba;', function (err, result) {
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

/* WYKROCZENIA */
router.get('/offenses', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_osoba_wykroczenie;', function (err, result) {
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

/* PRZESTEPSTWA */
router.get('/crimes', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.full_osoba_przestepstwo;', function (err, result) {
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

/* ID */
router.get('/id', function (req, res) {
    const client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
            return;
        }

        client.query('SELECT * FROM projekt.dane_osobowe;', function (err, result) {
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
