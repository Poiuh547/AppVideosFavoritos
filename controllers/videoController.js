const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        //son dos consultas, una devuelve videos, y la otra todas las categories
        conn.query('SELECT * FROM video ORDER BY date DESC', (err, videos) => {
            conn.query('SELECT category FROM video group by category', (err2, categories) => {
                if (err) {
                    res.json(err);
                }
                res.render('videos', {
                    opcionesList: categories, //aqui se envian los dos parametros al videos.ejs
                    data: videos
                });

            });
        });
    });
};

controller.listbycategory = (req, res) => {
    const { category } = req.params; //envia categoria por url
    console.log(`Se envió : ${category}`);
    req.getConnection((err, conn) => {
        //son dos consultas, una devuelve videos de acuerdo a categoria, y la otra las categories
        conn.query('SELECT * FROM video WHERE category = ? ORDER BY date DESC', category, (err, videos) => {
            conn.query('SELECT category FROM video group by category', (err2, categories) => {

                if (err) {
                    res.json(err);
                }
                res.render('videos', {
                    opcionesList: categories, //aqui se envian los dos parametros al videos.ejs
                    data: videos
                });

            });
        });
    });
};



controller.listcategories = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT DISTINCT category FROM video order by category', (err, categories) => {
            if (err) {
                res.json(err);
            }
            res.render('videos', {
                data: categories
            });
        });
    });
};


controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO video set ?', data, (err, video) => {
            console.log(video)
            res.redirect('/');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM video WHERE id = ?", [id], (err, rows) => {
            res.render('videos_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newVideo = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE video set ?  WHERE id = ?', [newVideo, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM video WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
}

module.exports = controller;