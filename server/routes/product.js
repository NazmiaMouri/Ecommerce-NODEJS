//Routes

const { requireAuth } = require("../../middleware/authMiddleware");



//get All dresses
router.get(`${api}/dresses`, requireAuth, (req, res) => {

    Dress.find().then((result) =>
        res.send(result)
    );



});

// get the specific dress
router.get(`${api}/dress`, requireAuth, (req, res) => {

    Dress.findOne().then((result) =>
        res.send(result)
    );



});

// post a dress to database
router.post(`${api}/dress`, upload.single('image'), (req, res) => {
    res.send(req.body)
    // res.send(fs.readFileSync())
    const product = new Dress({
        title: req.body.name,
        image: fs.readFileSync(req.file.path),
        body: req.body.body,
        countInStock: req.body.countInStock,
        favourite: req.body.favourite,
        price: req.body.price
    })

    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct);
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: err,
            success: false
        })
    })



})
