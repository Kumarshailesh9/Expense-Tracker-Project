
const Razorpay = require("razorpay");
const Order = require("../models/order");
const User = require("../models/user");
const jwt = require(('jsonwebtoken'));


exports.getOrders = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id:'rzp_test_IsjV4XTfFEokjr',
            key_secret: 'NKuW4nPKrSxWiokzBo8Puwc4'
        })


        const amount = 2500;

        rzp.orders.create({amount, currency : "INR"}, (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({  orderId: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order , key_id : rzp.key_id });
            }).catch(err => {
                throw new Error(err);
            })
        })
    }
    catch(err) {
        console.log(err);
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const { payment_id , order_id } = req.body;
        const order = await Order.findOne({ where: { orderId : order_id }});
        const promise1 = await order.update({ paymentId : payment_id , status : 'SUCCESSFUL'});
        const promise2 = await req.user.update({ispremiumuser : true});

        Promise.all([promise1,promise2]);

        const updatedUser = await User.findOne({ where: { id: req.user.id } });
        const token = jwt.sign({
            userId: updatedUser.id,
            name: updatedUser.name,
            ispremiumuser: true
        }, 'secretKey');
        console.log(token);
        return res.status(202).json({ success: true, message: "transaction successful", token });
               
    } catch(err){
        console.log(err);
    }
};





// exports.updateOrder = (req, res) => {
//     try {
//         const { payment_id , order_id } = req.body;
//         Order.findOne({ where: { orderId : order_id }}).then(order => {
//             order.update({ paymentId : payment_id , status : 'SUCCESSFUL'}).then(() => {
//                 req.user.update({ispremiumuser : true}).then(() => {
//                     return res.status(202).json({success: true, message: "transaction successful"});
//                 }).catch(err => {
//                     throw new Error(err);
//                 });
//             }).catch(err => {
//                 throw new Error(err);
//             });
//         });
//     } catch(err){
//         console.log(err);
//     }
// };



