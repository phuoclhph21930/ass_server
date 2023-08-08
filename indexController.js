const Product = require('../../model/product');
const User = require('../../model/user');

class IndexController {
    async index(req, res, next) {
        await Product.find()
            .then((products) => {
                res.render('index', { title: 'Products Management', products })
            })
            .catch((error) => {
                next(error)
            })
    }

    showdangky(req, res, next) {
        res.render('dangki', { title: 'Đăng ký' })
    }



    async dangky(req, res, next) {

        var user = new User(
            {
                username: req.body.username,
                password: req.body.password,
            })
        try {
            await user.save()
                .then((result) => {
                    console.log('Dang ky thanh cong');
                    console.log(result);
                    res.redirect('/dangnhap')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }

    showdangnhap(req, res, next) {
        res.render('dangnhap', { title: 'Đăng nhập' })
    }

    dangnhap(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({
            username: username,
            password: password,
        })
            .then((data) => {
                if (data) {

                    return res.redirect('/')
        } else {
                    return res.json("Login fail")
                }
            })
            .catch((error) => {
                res.status(500).json(error)
            })
    }


    async addProduct(req, res, next) {

        var product = new Product(
            {
                tensp: req.body.tensp,
                anhsp: req.body.anhsp,
                mau: req.body.mau,
                loaisp: req.body.loaisp,
                makh: req.body.makh,
                tenkh: req.body.tenkh,

            })
        try {
            await product.save()
                .then((result) => {
                    console.log('Product created:', result);
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }



    async addProduct(req, res, next) {

        var product = new Product(
            {
                tensp: req.body.tensp,
                anhsp: req.body.anhsp,
                mau: req.body.mau,
                loaisp: req.body.loaisp,
                makh: req.body.makh,
                tenkh: req.body.tenkh,

            })
        try {
            await product.save()
                .then((result) => {
                    console.log('Product created:', result);
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }

    async editProduct(req, res, next) {
        try {
            await Product.updateOne({ _id: req.params.id },
                {
                    tensp: req.body.tensp,
                    anhsp: req.body.anhsp,
                    mau: req.body.mau,
                    loaisp: req.body.loaisp,
                    makh: req.body.makh,
                    tenkh: req.body.tenkh,

                })
                .then((result) => {
                    console.log('Product edited:', result);
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }


    async deleteProduct(req, res, next) {
        const currentProduct = await Product.findById(req.params.id)
        await Product.deleteOne({ _id: req.params.id })
            .then(() => {
                return res.redirect('/')
            })
            .catch(next)
    }


}

module.exports = new IndexController;