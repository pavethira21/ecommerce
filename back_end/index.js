
const express = require('express')
const dotenv = require('dotenv')
const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs')
app.use(cors())
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
dotenv.config()
const jwtseccode = process.env.JWT_SECRET

const uri="mongodb://localhost:27017"
const client = new MongoClient(uri)
const dbName = 'ecommerce'
const collectionProduct = 'products' 
const user_collection ='users'

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

async function getRecords(col,id,page,category){
    if(page){
        console.log(page,category,col,id)
        const limit = 5
        const skip = (page-1) * limit
        console.log(skip)
        const result = await client.db(dbName).collection(col).find({sub_category:category}).skip(skip).limit(5).toArray()
    console.log(result)
    return result
    }
    const result = await client.db(dbName).collection(col).findOne({pid:id})
    console.log(result)
    return result

}



app.post("/login",async (req,res)=>{
    main()
    const {email,password} = req.body
    try{
        const users = await client.db("movieReview").collection("users").findOne({email})
        if(!users){
            return res.json({message:"Invalid email"})
        }
        const match = await bcrypt.compare(password,users.password)
        if(!match){

            return res.json({message:"Invalid password"})
        }
        else{
            console.log('matched')
            console.log(users._id)
            const token = jwt.sign({ name:users.userName },jwtseccode , { expiresIn: "1h" });
            console.log('token_created')
            console.log(token)
            client.close();
            return res.json({ token, user: { id: users._id, name: users.userName, email: users.email } });
            
        }
        
    
        
    }catch(e){
        res.send(e)
    }
    finally{
        client.close()
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
        
    const {userName,password,email,address,age,phno,prefered_category} =req.body
    
    const users = await client.db(dbName).collection(user_collection).findOne({email:email})
    
    console.log('fetched user')
    //console.log(checkExist);
    
    if(users){
        console.log('fetched user')
        client.close()
        return res.status(401).json({message:"User already exist"})
        
    }else{
       
                const hashPassword = await bcrypt.hash(password,10)
                console.log(' password hashed')
                const record = {userName:userName,password:hashPassword,email:email,
                    address:address,age:age,phno:phno,prefered_category:prefered_category}
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
        const user = await client.db("movieReview").collection("users").findOne({ _id: new ObjectId(req.user.id) }, { projection: { password: 0 } });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    }catch(e){
        console.log(e)
    }
})

app.post('/getProduct',async (req,res)=>{

    const {productId} = req.body   
    
    main()
    try{
        const product =await getRecords(collectionProduct,productId)
        console.log(product)
        return res.json({product})
    }catch(e){

        console.log(e)
    }
    
})
//client.db(dbName).collection(collectionProduct).find({sub_category:category}).toArray()
app.get('/category',async(req,res)=>{
    const {category,page} = req.query
   
    main()
    try{
        const details = await getRecords(collectionProduct,null,page,category)
        if(details){
            const len = details.length
            return res.json({len})
        }else{
            return res.json({msg:"product not found"})
        }
        
    }catch(e){

        console.log(e)
    }
})



function authentication(req,res,next){
    const token = req.header.authorization
    if(!token){
        console.log('indise token if');
        
        console.log(token)
        return res.json({message:" user does not exist"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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