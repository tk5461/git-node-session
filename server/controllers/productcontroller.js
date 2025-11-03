const Product = require("../modules/productmodel")

const getAllProducts = async (req,res)=>{
    const products = await Product.find().lean()
    const {category} = req.query
    if(!products)
        return res.status(400).json({message:'no producte found'})
    if(!category)
      return res.json(products)
    const filter = await Product.find({category : category })
    res.status(200).json(filter)
}

const getProductById = async (req,res)=>{
    const {id} = req.params
    const producte = await Product.findById(id)
    if(!producte)
        return res.status(400).json({message:'No product found'})
    res.json(producte)
}

const creatNewProduct = async (req,res)=>{
    const {name,category,images,minSize,maxSize,price} = req.body
    if (!name || !price) {
        return res.status(400).json({ message: 'name and price are required' })
    }
    const producte = Product.create({name,category,images,minSize,maxSize,price})
    if(producte)
        return res.status(201).json({message:'New product created'})
    else
        return res.status(400).json({ message: 'Invalid producte'}) 
}

const updateProdacte = async (req,res)=>{
    const{id}= req.params
    const {name,category,minSize,maxSize,price} = req.body
    if(!id)
        return res.status(400).json({ message: 'No products found' })
    const producte = await Product.findById(id).exec()
    if(!producte)
        return res.status(400).json({ message: 'Producte not found' })
    producte.id = id,
    producte.name = name,
    producte.category = category,
    producte.minSize = minSize,
    producte.maxSize = maxSize,
    producte.price = price
    const updateproducte = await producte.save()
    
    res.json(`${updateproducte.name} update well !!`) 
}

const deletProducte = async (req,res)=>{
    const {id} = req.params
    const product = Product.findById(id).lean()
    if (!product)
        return res.status(400).json({ message: 'id not found' })
    const result = await product.deleteOne()
    const reply = "Prodact delet well !!!"
    res.json(reply)
}


module.exports={getAllProducts,getProductById,creatNewProduct,updateProdacte,deletProducte}
