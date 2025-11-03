const CartProducte = require("../modules/ShoppingCartmodel")
const Product = require("../modules/productmodel")

const getAllProducts = async (req,res)=>{
    const {id}=req.params
    const cartProducte = await CartProducte.find({userId:id}).populate("productId").lean()
    if(!cartProducte) 
        return res.status(400).json({message:'no producte in cartProducte found'})
    res.json(cartProducte)
} 

const creatNewProductIncartProducte = async (req,res)=>{
    const {userId,productId,amount=1} = req.body
        let existingCartItem = await CartProducte.findOne({ userId, productId });
        if (existingCartItem) {
            existingCartItem.amount += 1; 
            await existingCartItem.save();
            return res.status(200).json({ message: 'Product quantity updated in cart'});
        } else {
            const newCartItem = await CartProducte.create({ userId, productId, amount });
            if(newCartItem)
                return res.status(201).json({ message: 'New product added to cart', cartItem: newCartItem });
            else
                return res.status(400).json({ message: 'Invalid Product', cartItem: newCartItem });
        }
}

const updateIncartProducte = async (req,res)=>{
    const {userId,productId,amount} = req.body
    if(!productId)
        return res.status(400).json({ message: 'No product found' })
    const cartProducte = await Product.findById(productId).exec()
    if(!cartProducte) 
        return res.status(400).json({ message: 'Producte not found' }) 
    CartProducte.amount = amount
    const updateproducte = await cartProducte.save()
    res.json(`${updateproducte.amount} update well !!`) 
}

const deletProducte = async (req,res)=>{
    const {productId} = req.params
    const cartProducte = CartProducte.findById(productId).lean()
    if (!cartProducte)
        return res.status(400).json({ message: 'productId not found' })
    const result = await CartProducte.deleteOne()
    const reply = "Product delet well !!!"
    res.json(reply)
}

module.exports={getAllProducts,creatNewProductIncartProducte,updateIncartProducte,deletProducte}
