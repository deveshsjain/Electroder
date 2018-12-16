const express = require("express");
const router = express.Router();
const data = require("../data");
const prodData = data.productsData;

router.get("/", async (req, res) => {

    try {
        const prodList = await prodData.getAllProducts();

        res.render('admin/crud', { prodList });
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/addlaptop", async (req, res) => {
    try {
        res.render('admin/addlaptop')
    } catch (e) {
        res.status(500).send();
    }
})

router.get("/updatelaptop/:id", async (req, res) => {
    try {
        const prod = await prodData.getProduct(req.params.id)
        console.log(prod)
        res.render('admin/updatelaptop', { prod });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

router.get("/deletelaptop/:id", async (req, res) => {
    try {
        //const prod = await prodData.getProduct(req.params.id)
        const prod1 = await prodData.removeProduct(req.params.id)
        console.log(prod1)
        res.redirect("/admin");
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})
router.post("/updatedlaptop", async (req, res) => {
    try {
        const updatedcontent = req.body;
        const updatedlaptop = {
            prod_name: updatedcontent.name,
            prod_brand: updatedcontent.brand,
            prod_price: "$ " + updatedcontent.price,
            prod_screensize: updatedcontent.ss + " Inches",
            prod_ram: updatedcontent.ram + " GB",
            prod_processor: updatedcontent.processor,
            prod_hard_disk_size: updatedcontent.hdd + " TB",
            prod_rating: updatedcontent.rating,
            sold: updatedcontent.sold
        }
        const updatedlaptop1 = await prodData.updateProduct(updatedcontent.prodid, updatedlaptop);
        res.redirect("/admin");
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})
// router.post("/updatedlaptop", async (req, res) => {
//     try {
//         const updatedcontent = req.body;
//         const updatedlaptop = {
//             prod_name: updatedcontent.name,
//             prod_brand: updatedcontent.brand,
//             prod_price: updatedcontent.price,
//             prod_screensize: updatedcontent.ss,
//             prod_ram: updatedcontent.ram,
//             prod_processor: updatedcontent.processor,
//             prod_hard_disk_size: updatedcontent.hdd,
//             prod_rating: updatedcontent.rating,
//             sold: updatedcontent.sold
//         }

//         const updatedlaptop1 = await prodData.updateProduct(updatedcontent.prodid, updatedlaptop);
//         console.log(updatedlaptop1)
//         res.json(updatedlaptop1);

//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// })

router.post("/addedlaptop", async (req, res) => {
    try {
        const newcontent = req.body;
        const laptopInfo = {
            prod_name: newcontent.name,
            prod_image1: newcontent.image1,
            prod_image2: newcontent.image2,
            prod_image3: newcontent.image3,
            prod_brand: newcontent.brand,
            prod_price: newcontent.price,
            prod_screensize: newcontent.ss,
            prod_ram: newcontent.ram,
            prod_processor: newcontent.processor,
            prod_hard_disk_size: newcontent.hdd,
            prod_rating: newcontent.rating,
            sold: newcontent.sold
        }
        console.log(laptopInfo)
        const addedlaptop = await prodData.createProductByObject(laptopInfo);
        res.redirect('/admin');
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

module.exports = router;