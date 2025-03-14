const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const fs = require('fs')
app.use(cors())
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
dotenv.config()
const jwtseccode = process.env.JWT_SECRET

const uri="mongodb://localhost:27017"
const client = new MongoClient(uri)
const dbName = 'ecommerce'
const collectionProduct = 'product' 
const user_collection ='users'
const ad_collection = 'adver'
const cart_collection = 'cart'


async function main(){
    try{
        await client.connect();
        console.log("connected to mongodb")   
    }catch(e){console.error(e)}}  

async function insertRecords(col,re){
    console.log(col,re)
    try{
        const result = await client.db(dbName).collection(col).insertOne(re)
        console.log(result)
        return result
    }catch(e){
        console.log(e)
    }
    
}

async function deleteRecord(col,id) {
    console.log('indise func')
    const result = await client.db(dbName).collection(col).deleteOne({pid:id})
    return result
}

async function getRecords(col,id,page){
    const pages = page || 1
    // if(page){
    //     console.log(page,cat,col,id)
        
         
    //     const limit = 5
    //     const skip = (page-1) * limit
    //     console.log(skip)
    //     const result = await client.db(dbName).collection(col).find({category:{$regex:cat,$options:"i"}}).skip(skip).limit(5).toArray()
    // console.log(result)
    // return result
    // }
    if(id){
        const result = await client.db(dbName).collection(col).findOne({pid:id})
    console.log(result)
    return result
    }else{
        const limit = 20
        const skip = (pages-1) * limit
        const result = await client.db(dbName).collection(col).find({}).skip(skip).limit(20).toArray()

        const totalproduct = await client.db(dbName).collection(collectionProduct).countDocuments({});
        return ({
            result,
            currentPage: page,
            totalPages: Math.ceil(totalproduct / limit),
            totalproduct,
        });
    }
    

}



app.post("/addAd",async (req,res)=>{
    main()
    const {name,url} = req.body
    const id = Date.now()
    const record = {id:id,name:name,url:url}
    try{
        const status = insertRecords(ad_collection,record)
        if((await status).acknowledged){
                
            client.close()
            console.log("db Closed");
            
            return res.status(200).json({message:"Added successfully"})
           }else{
            client.close()
            return res.status(401).json({message:"Not Added"})
           }
    }
    catch(e){
        console.log(e)
    }
})
app.post("/login",async (req,res)=>{
    main()
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {email,password} = req.body
    try{
        if(!email || !pattern.test(email)|| !password){
            return res.json({message:"Enter Valid Email and Password"})
        }
        console.log('1')
        const users = await client.db(dbName).collection(user_collection).findOne({email})
        if(!users){
            console.log('no user')
            return res.json({message:"Invalid email"})
        }
        const match = await bcrypt.compare(password,users.password)
        if(!match){
            console.log('not matched')
            return res.json({message:"Invalid password"})
        }
        else{
            console.log('matched')
            console.log(users._id)
            const token = jwt.sign({ email:users.email },jwtseccode , { expiresIn: "7h" });
            console.log('token_created')
            console.log(token)
            
            return res.status(200).json({ 
                token, 
                user: { 
                    id: users._id, 
                    name: users.userName, 
                    email: users.email 
                } 
            });
            
        }
        
    
        
    }catch(e){
        res.status(500).send(e)
    }
    finally{
       await client.close()
    }


});

app.post('/deleteProduct',async(req,res)=>{
    const {productId} = req.body
    main()
    try{
        const exist = await getRecords(collectionProduct,productId)
        if(!exist){
            return res.json({msg:"Product not found"})
        }
        const result = await deleteRecord(collectionProduct,productId)
        if((result).acknowledged){
            client.close()
            console.log("db Closed");
            
            return res.send("Records Deleted Succefully")
           }else{
            client.close()
            return res.send("Records cannot be Deleted")}

    }catch(e){
        console.log(e)
    }

})

app.post('/deleteUser',async(req,res) =>{
    const {email} = req.body
    console.log("api hit")

    main()
    try{
        console.log("hit try")
        const users = await client.db(dbName).collection(user_collection).findOne({email:email})
        if(users){
            const afterDelete = await client.db(dbName).collection(user_collection).deleteOne({email:email})
            client.close()
            if(afterDelete.acknowledged){
                return res.json({msg:"User deleted successfully"})
            }else{
                return res.json({msg:"Could not delete user"})
            }
            
        }else{
            client.close()
            return res.json({msg:"Record not found"})
        }
       
        
    }catch(e){

    }
})
app.post('/Adduser',async(req,res)=>{
    console.log("indise adus");
    
    main()
    try{
        console.log('inside try');
        
    const {userName,password,email,address,age,phno} =req.body
    if(userName?.length<3 && email?.length<6 && !pattern.test(email)){
        return res.json({msg:"Enter Valid username and email"})
    }
    const users = await client.db(dbName).collection(user_collection).findOne({email:email})
    
    console.log('fetched user')
    //console.log(checkExist);
    
    if(users){
        console.log('fetched user')
        client.close()
        return res.status(401).json({message:"Looks like you already have an account , Log in to Access"})
        
    }else{
       
                const hashPassword = await bcrypt.hash(password,10)
                console.log(' password hashed')
                const record = {userName:userName,password:hashPassword,email:email,
                    address:address,age:age,phno:phno}
                console.log(record)
               const status= insertRecords(user_collection,record)
            //    return res.status(200).json({message:"Updated"})
               //console.log((await status).acknowledged)
               if((await status).acknowledged){
                
                client.close()
                console.log("db Closed");
                
                return res.status(200).json({message:"Updated"})
               }else{
                client.close()
                return res.status(401).json({message:"Not Updated"})
               }
    }

    
    
    
            }catch(e){
                console.log(e)
            }
            finally{
                console.log('finally')
                client.close()
            }
})

app.post('/addProduct',async(req,res)=>{
    const {actual_price,average_rating,brand,category,description,discount,images,out_of_stock,pid,product_details,seller,selling_price,sub_category,title} = req.body
    const data ={actual_price,average_rating,brand,category,description,discount,images,out_of_stock,pid,product_details,seller,selling_price,sub_category,title}
    main()
    try{
        const result = insertRecords(collectionProduct,data)
        res.send(result)

    }catch(e){
        console.log(e)
    }
})

app.get('/user',authentication,async (req,res)=>{
    
    try{
        main()
        console.log(req.user)
        const user = await client.db(dbName).collection(user_collection).findOne({ email: req.user.email }, { projection: { password: 0 } });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    }catch(e){
        console.log(e)
    }
})

app.get('/getProduct',async (req,res)=>{

    const {pid,page} = req.query  
    
    main()
    try{
        const product =await getRecords(collectionProduct,pid,page)
        console.log(product)
        return res.json(product)
    }catch(e){

        console.log(e)
    }finally{
        await client.close()
    }
       
    
    
})

app.post('/addCart',async(req,res)=>{
    main()
    const {id,name,price,quantity} = req.body
    console.log('hit')
   
    if(!id || !name|| !price || !quantity){
        return res.json({msg:"Enter All values"})

    }
    console.log('all details')
    const exist = await client.db(dbName).collection(cart_collection).findOne({id:id})
    console.log(exist)
    if(exist){
        console.log('value exist')
        const status = await client.db(dbName).collection(cart_collection).updateOne({id:id},{$inc:{quantity:quantity}})
    }else{
        console.log('value not exist')
        const record = {id :id,name:name,price:price,quantity:quantity }
        const records = await insertRecords(cart_collection,record)
        console.log(records)
    }
        
    
    console.log('records')
    const updatedRecord = await client.db(dbName).collection(cart_collection).find({}).toArray()
    console.log(updatedRecord)
    if(!updatedRecord){
        return res.json({msg:"Cart Empty"})
    }else{
       return res.json({updatedRecord})
    }
})

app.post('/cartDelete',async(req,res)=>{
    const {id} = req.body
    if(!id){
        return res.json({Message:"id required"})
    }
    const exist = await client.db(dbName).collection(cart_collection).findOne({id:id})
    if(exist){
        const status = await client.db(dbName).collection(cart_collection).deleteOne({id:id})
        if(status.acknowledged){
            return res.json({msg:"deleted successfully"})
        }else{
            return res.json({msg:"could not delete"})
        }
    }else{
        return res.json({msg:"Record not found"})
    }
})
app.post('/sortProducts',async(req,res)=>{
    main()
    console.log("sort products")
    const {condition,page} = req.body
    console.log(condition)
    
    try{
        console.log('try')

        if(!condition){

            return res.json({msg:"specify sort condition"})}
    if(condition ==="price low to high"){
        console.log(condition)
        const pages = page || 1
        const limit = 20
        const skip = (pages-1) * limit
        const records = await client.db(dbName).collection(collectionProduct).find().sort({salePrice:1}).skip(skip).limit(limit).toArray()
        
        if(!records){

            return res.json({msg:"no records"})
        }

       const totalproduct = await client.db(dbName).collection(collectionProduct).countDocuments({});
       
        return res.json({
            records,
            currentPage: pages,
            totalPages: Math.ceil(totalproduct / limit),
            totalproduct,
        });
    }else if(condition==="price high to low"){
        const records = await client.db(dbName).collection(collectionProduct).find().sort({salePrice:-1}).limit(5).toArray()
        if(!records){
            return res.json({msg:"no records"})
        }
        return res.json(records)
    }
    else if(condition ==="popularity"){
        console.log('hit')
        const records = await client.db(dbName).collection(collectionProduct).find({}, { projection: { name:1,images:1,description:1,salePrice:1,bestSellingRank:1,pid:1} }).sort({bestSellingRank:-1}).limit(5).toArray()
        console.log(records)
        if(!records){
            return res.json({msg:"no records"})
        }
        return res.json(records)
    }
}catch(e){console.log(e)}finally{
   await client.close()
}
})

app.post('/filterProducts',async(req,res)=>{
    main()
    try{
        const {filters,category,filterName} = req.body
        if(!filters || !filterName){
            return res.json({msg:"Filter Not mentioned"})
        }
        if(filterName=="brand"){

            const result = await client.db(dbName).collection(collectionProduct).find({brand:filters}).limit(5).toArray()
            if(result){
                console.log('hit')
                return res.json({result})
            }else{
               
                return res.json({msg:"record not found"})
            }
        }
        if(filterName=="subcategory"){
            const result = await client.db(dbName).collection(collectionProduct).find({sub_category:{$regex:filters,$options:"i"}}).limit(5).toArray()
            if(result.length>1){
                console.log('hit result')
                return res.json({result})
            }else{
               
                return res.json({msg:"record not found"})
            }
        }
        
    }catch(e){
        console.log(e)
    }finally{
        client.close()
    }
})

app.post('/category',async(req,res)=>{
    console.log('hello')
    const {category,page} = req.body
    const pages = page || 1
    const limit = 10
    const skip= (pages -1) * limit
    main()
    client.db(dbName).collection(collectionProduct).createIndex({category:"text",sub_category:"text"});
    try{
        console.log('hi')
       
        const details = await client.db(dbName).collection(collectionProduct).find({$text:{$search:category}}).skip(skip).limit(limit).toArray();
        if(details.length>0){
            console.log('hello')
            const totalCount = await client.db(dbName).collection(collectionProduct).countDocuments({ $text: { $search: category } });
            const totalPages = Math.ceil(totalCount / limit);
            return res.json({
                data: details,
                totalPages: totalPages
            });
        }else{
            return res.json({msg:"product not found"})
        }
        
    }catch(e){

        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" });
    }finally{
        client.close()
    }
})





function authentication(req,res,next){
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        console.log('indise token if');
        
        console.log(token)
        return res.json({message:" user does not exist"})
    }
    try {
        const decoded = jwt.verify(token, jwtseccode);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }

}

app.listen(PORT ,()=>
{
    console.log("listening on post no:",PORT)
})