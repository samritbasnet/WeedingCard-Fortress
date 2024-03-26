const stripe =require("stripe");

const stripeClient= new stripe("sk_test_51Or7o1CqSy0cSmfjIEODqdxX548KcKNpyoZiWNMIIuqRof7a5vrwpaaJN0FgeIKeCWeS1ze1KbejCDmtOu6zl1L100HZuv4Rho");

exports.createStripeCheckout= async (req,res)=>{
    const image=req.body.image;
    const session=await stripeClient.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:"CAD",
                product_data:{
                    name:'generatedImage.title',
                    description:"Ai generated image",
                    images:[image]
                },
                unit_amount: Math.floor(Math.random() * 901) + 100
            },
            quantity:1
        }],
        mode:"payment",
        success_url: image,
        cancel_url:'http://localhost:5173/home2'
    });
    return res.send(session);
}

exports.checkPaymentStatus = async (req, res) => {
    const sessionId = req.body.sessionId;

    try {
        const session = await stripeClient.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
           
            console.log("success")
            return res.send({ status: 'success' });
        } else {
            console.log("pending")
            return res.send({ status: 'pending' });
        }
    } catch (error) {
        console.error('Error checking payment status:', error.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}