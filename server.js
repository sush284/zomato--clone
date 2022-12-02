import mongodb  from 'mongodb';
import bcrypt from 'bcrypt';
import express from 'express';
import xlsxFile from 'read-excel-file'
import  jwt from 'jsonwebtoken';
import Parse from 'body-parser'
let MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://sush284:sush284@cluster0.el0s6ri.mongodb.net/?retryWrites=true&w=majority";
// var privateKey = '0000'
const saltRounds = 10;

const timings = {
    'BRF':'BRF',
    'LCH':'LCH',
    'DNR':'DNR',
    'NGT':'NGT',
    'SKS':'SKS',
    'DRK':'DRK',
};

const cuisine = {
    'NI':'NI',
    'SI':'SI',
    'CHIN':'CHIN',
    'SF':'SF'
}

const locationCodes = {
    'BLR':'BLR',
    'MUM':'MUM',
    'CHN':'CHN',
    'AP':'AP',
    'VNR':'VNR',
    'BTS':'BTS',
}

const restaurants = [
    {
        'name':'Barbeque Nation',
        'code':'BNQ',
        'location_codes':[locationCodes.VNR,locationCodes.CHN],
        'timing_codes':[timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SI],
        'cost':550,
        'overview':'Gives dinner,lunch,breakfast in chennai',
        'image':'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/07/barbeque-nation-1594710068.jpg',
        "address":"32 Vellore Street, Bangalore",
        "contact":91859656965,
    },
    {
        'name':'Highway King',
        'code':'HKG',
        'location_codes':[locationCodes.BLR,locationCodes.AP],
        'timing_codes':[timings.DNR,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SI, cuisine.SF],
        'cost':250,
        'overview':'Gives dnr,lnc,brf in vnr and chn',
        'image':'https://www.crazymasalafood.com/wp-content/images/2021/12/Hotel-Highway-King.jpg',
        "address":"32 Vaishali Street Chennai",
        "contact":91854574454,
    
    },
    {
        'name':'Cafe Masala',
        'code':'CM',
        'location_codes':[locationCodes.VNR,locationCodes.AP],
        'timing_codes':[timings.BRF],
        'cuisine':[cuisine.SI,cuisine.SF],
        'cost':300,
        'overview':'Gives brf in vnr and ap',
        'image':'https://cdn.usarestaurants.info/assets/uploads/89f2af83d08fc9e3bee465ff94d2b86d_-united-states-new-jersey-hudson-county-jersey-city-masala-cafe-chettinad-201-360-3367htm.jpg',        
        "address":"#32 Koramangala street blr",
        "contact":91859656965,

    },
    {
        'name':'Rangreza',
        'code':'RZ',
        'location_codes':[locationCodes.BTS,locationCodes.AP],
        'timing_codes':[timings.DNR, timings.SKS],
        'cuisine':[cuisine.NI],
        'cost':200,
        'overview':'Dnr in BTS , ap',
        'image':'https://media-cdn.tripadvisor.com/media/photo-s/18/ec/b7/ac/pool.jpg',
        "address":"Banipark, Jaipur",
        "contact":91859656965,

    },
    {
        'name':'Cafe Coffee Day',
        'code':'CCD',
        'location_codes':[locationCodes.AP,locationCodes.CHN],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SI,cuisine.CHIN],
        'cost':1000,
        'overview':'Gives dnr,lnc,brf in ap and chn',
        'image':'https://pix10.agoda.net/hotelImages/2191714/-1/b8debc51b264d33ceee8eb58d7d84511.jpg?ca=7&ce=1&s=1024x768',
        "address":"#32 Koramangala street blr",
        "contact":91859656965,

    },
    {
        'name':'Dosa Factory',
        'code':'DF',
        'location_codes':[locationCodes.BLR,locationCodes.CHN,locationCodes.VNR],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SF],
        'cost':400,
        'overview':'Gives dnr,lnc,brf in blr, chn, vnr',
        'image':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/i/e/p28145-15405415745bd2cc867940c.jpg?tr=tr:n-xlarge',
        "address":"#756 ABC STreet , Chennai",
        "contact":91859656965,

    },
    {
        'name':'Star Bucks Coffee',
        'code':'SBC',
        'location_codes':[locationCodes.BLR,locationCodes.CHN,locationCodes.VNR],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SF],
        'cost':650,
        'overview':'Gives dnr,lnc,brf in blr, chn, vnr',
        'image':'https://images.moneycontrol.com/static-mcnews/2018/07/Starbucks-final-770x433.png',
        "address":"#756 ABC STreet , Chennai",
        "contact":91833333365,

    },
    {
        'name':`A2Z Jaini's Cafe`,
        'code':'AZJ',
        'location_codes':[locationCodes.BLR,locationCodes.CHN,locationCodes.VNR],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SF],
        'cost':800,
        'overview':'Gives dnr,lnc,brf in blr, chn, vnr',
        'image':'https://phrconsultant.in/home/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-05-at-10.34.03-AM-1-1024x577.jpeg',
        "address":"#756 ABC STreet , Chennai",
        "contact":91877644965,

    },
    {
        'name':'Red Chilli Cafe',
        'code':'RCC',
        'location_codes':[locationCodes.BLR,locationCodes.CHN,locationCodes.VNR],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SF],
        'cost':900,
        'overview':'Gives dnr,lnc,brf in blr, chn, vnr',
        'image':'https://b.zmtcdn.com/data/pictures/2/20181432/2cd079d2e03f14e6f54517952354ad40.jpeg',
        "address":"#756 ABC STreet , Chennai",
        "contact":91857777965,

    },
    {
        'name':'Fab Eatery',
        'code':'FBE',
        'location_codes':[locationCodes.BLR,locationCodes.CHN,locationCodes.VNR],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SF],
        'cost':1150,
        'overview':'Gives dnr,lnc,brf in blr, chn, vnr',
        'image':'https://www.creativetourist.com/app/uploads/2016/08/Fab-Cafe-Manchester-1-785x486.jpg',
        "address":"#756 ABC STreet , Chennai",
        "contact":91857777965,
    },
    {
        'name':'Dosa Corner',
        'code':'DC',
        'location_codes':[locationCodes.BLR,locationCodes.CHN,locationCodes.VNR],
        'timing_codes':[timings.DNR,timings.LCH,timings.BRF],
        'cuisine':[cuisine.NI,cuisine.SF],
        'cost':1300,
        'overview':'Gives dnr,lnc,brf in blr, chn, vnr',
        'image':'https://fartleyfarms.com/wp-content/uploads/2021/01/dcorn001a.jpg',
        "address":"#756 ABC STreet , Chennai",
        "contact":91857777965,

    
    },
    
]

const quickRestaurantFilters = [
    {
        'timing':'Breakfast',
        'code':timings.BRF,
        'image':'https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/breakfast.jpg',
        'description':'Start Your day with exclusive breakfast options'
    },
    {
        'timing':'Lunch',
        'code':timings.LCH,
        'image':'https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/lunch.jpg',
        'description':'Start Your day with exclusive breakfast options'
    },
    {
        'timing':'Dinner',
        'code':timings.DNR,
        'image':'https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/dinner.jpg',
        'description':'Start Your day with exclusive breakfast options'
    },
    {
        'timing':'Snacks',
        'code':timings.SKS,
        'image':'https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/snacks.jpeg',
        'description':'Start Your day with exclusive breakfast options'
    },
    {
        'timing':'Night',
        'code':timings.NGT,
        'image':'https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/nightlife.jpg',
        'description':'Start Your day with exclusive breakfast options'
    },
    {
        'timing':'Drinks',
        'code':timings.DRK,
        'image':'https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/drinks.jpg',
        'description':'Start Your day with exclusive breakfast options'
    }
]

const client = new MongoClient(uri,{
});

const app = express();
const PORT = 9192;

app.use(express.json());
app.use(express.urlencoded());

client.connect(err =>{
    if(err){
        console.log(err)
    }
    console.log("CONNECTED TO DB")
})

const db = client.db('test');
client.close();


function getHeaderFromToken(token) {
    const decodedToken = jwt.decode(token, {
     complete: true
    });
   
    if (!decodedToken) {
     // eslint-disable-next-line no-undef
     throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `provided token does not decode as JWT`);
    }
   
    return decodedToken;
}

// GETTING END POINTS
app.get('/getFood', async(req, res) => {
    try{
        console.log(req.headers.token)
        const tokenHeaders = getHeaderFromToken(req.headers.token);
        console.log(tokenHeaders);
        const limitGiven = parseInt(req.query.limit) || 100;
        const pageGiven = parseInt(req.query.page) || 1;
        const itemsToSkip = (pageGiven-1)*limitGiven;

        const totalRecord = await (await db.collection('food').find({}).toArray()).length;
        const foods = await db.collection('food').find({}).skip(itemsToSkip).limit(limitGiven).toArray();
        res.send({
            'status':200,
            'data': foods,
            'total':totalRecord
        })
    } catch(e){
        res.send({
            'status':500,
            'data': e
        })
    }
});

app.get('/getQuickRestaurantFilters', async(req, res) => {
    try{
        res.send({
            'status':200,
            'data': quickRestaurantFilters,
        })
    } catch(e){
        res.send({
            'status':200,
            'data': quickRestaurantFilters
        })
    }
});

app.get('/getLocations', async(req, res) => {
    const locations = [
        {
            'name':'Bangalore',
            'code':locationCodes.BLR
        },
        {
            'name':'Chennai',
            'code':locationCodes.CHN
        },
        {
            'name':'Andhra Pradesh',
            'code':locationCodes.AP
        },
        {
            'name':'Mumbai',
            'code':locationCodes.MUM
        },
        {
            'name':'Vaishali Nagar',
            'code':locationCodes.VNR
        },
        {
            'name':'Bandra Terminus',
            'code':locationCodes.BTS
        },
        

    ]
    try{
        res.send({
            'status':200,
            'data': locations,
        })
    } catch(e){
        res.send({
            'status':200,
            'data': locations
        })
    }
});

app.get('/getRestaurants', async(req, res) => {
    const location_code = req.query?.location_code;
    const timing_code = req.query?.timing_codes;
    const selectedCuisine = req.query?.selectedCuisine;
    let costFilter = req.query?.selectedCostRange;
    let SFCode=req.query?.sortFilterCode;
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 2;
    let filters = {};

    if(location_code){
        filters['location_codes']= location_code //.join(',')
    }
    if(timing_code){
        filters['timing_codes']= timing_code//.join(',')
    }
    if(selectedCuisine){
        filters['cuisine']= selectedCuisine.join(',')
    }
    // console.log(filters)

    let filtered_restaurant = [];

    filtered_restaurant = restaurants.filter(restaurant => {
        return Object.keys(filters).every(filter => {
            return restaurant[filter].some((item,index)=>satisfyCallBack(item,index,filters[filter]))
        });
    });

    // ---------------------COST FILTERS (RANGE IN RUPEES)----------------
    if(costFilter){
        costFilter = JSON.parse(costFilter);
        filtered_restaurant = filtered_restaurant.filter((item)=>{
            return (item.cost >= costFilter.from && item.cost <= costFilter.to)
        });
    }


    //------------------SORT FILTERS (HIGH TO LOW)----------------------------

    if(SFCode === "DSC")
    { 
         filtered_restaurant =filtered_restaurant.sort(function(a, b)
            {
                return b.cost-a.cost;
            });
    }

    // -----------------SORT FILTERS (LOW TO HIGH)---------------------------
    if(SFCode === "ASC")
    {
        console.log("I AM INSIDE ASC");
        filtered_restaurant=filtered_restaurant.sort(function(a, b)
        {
            return a.cost-b.cost;
        });
    }

    
    //-----------------------Pagination server code-------------------------------

    const skip = (page-1)*limit;
    const tempFr = [...filtered_restaurant];
    tempFr.splice(0,skip);// To skip
    //give 0 - limit-1 items
    const limitAppliedItems = tempFr.slice(0,limit)
    //To ADD specific page data

    try{
        res.send({
            'status':200,
            'data': {
                'restaurants':limitAppliedItems,
                'total':filtered_restaurant.length
            },
        })
    } catch(e){
        console.error(e)
        res.send({
            'status':200,
            'data': filtered_restaurant
        })
    }
});

function satisfyCallBack(restaurantItem,index,filterItem){
    let flag = false;
    const splitArray = filterItem.split(',');
    splitArray.forEach(element => {
        flag = flag || (element === restaurantItem);
    });
   return (flag);  
}

app.get('/getRestaurantDetails', async(req, res) => {
    const restaurantCode = req.query.code;
    
    const restaurantDetails = restaurants.find((item)=>{
        return item.code === restaurantCode;
    })
    try{
        res.send({
            'status':200,
            'data': restaurantDetails,
        })
    } catch(e){
        res.send({
            'status':200,
            'data': restaurantDetails
        })
    }
});

app.get('/filterFood', async(req, res) => {
    const foods = await db.collection('food').find({'cuisine':'breakfast','cost':'200'}).toArray();
    res.send({
        'status':200,
        'data': foods
    })
});

app.post('/addFood',async(req,res)=>{
    const result = await db.collection('food').insertOne({...req.body})
    res.send({
        'status':200,
        'message': 'Food item added successfully',
        'data':result.insertedId
    })
});

app.post('/signup',async(req,res)=>{
    // if username exists ....
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            const result = await db.collection('userInfo').insertOne({...req.body,'password':hash})
            if(result.acknowledged){
                res.send({
                    'status':200,
                    'message': 'user item added successfully',
                })
            }
            
        });
    });
});

app.post('/login', async (req, res) => {
    console.log(req.body)
    let result;
    const user = await db.collection('userInfo').find({'username': req.body.username }).limit(1).toArray();
    console.log("logged user is " +user);
    // const user = [
    //     {
    //       _id: "6329670bd269ada87dbd8e28",
    //       username: 'sushma123@gmail.com',
    //       password: '$2b$10$dCOm7PCLU/XTTwiEo1.s2uAaX92/NuxCVkREHICEKk7pjCHp/LIXK',
    //       role: 'admin'
    //     }
    // ]
    if (user && user.length) {
        // encrypt what is passed and check with what is stored 0r
        // decrypt what is stored and check with what is passed ..

        bcrypt.compare(req.body.password, user[0].password, function (err, result) {
            if (result) {
                console.log("I GOT THE RESULT "+ result)
                const tokenSignature = {
                                    'userDetails':{
                                        'firstName':user[0].username,
                                        'lastName':user[0].username,
                                        'username':user[0].username,
                                        'email':user[0].username,
                                    },
                                    'authorizationDetails':{
                                            'routes': ['restaurantList', 
                                                      'addRestaurant',
                                                      'addFilters'
                                                    ] 
                                    }
                }
                const token = jwt.sign(tokenSignature,'secret',
                                      { expiresIn: '1h' });
                console.log("token is "+token);
                result = {
                    'status': 200,
                    'data': {
                        'token': token
                    },

                }
                res.send({ ...result })
            } else {
                result = {
                    'status': 401,
                    'data': 'Password mismatch'
                }
                res.send({ ...result })
            }
        });

    } else {
        result = {
            'status':401,
            'data': 'No user found'
        }
        res.send({ ...result })
    }
});


app.post('/addFoods',async(req,res)=>{
    let result ='';
    const schema = {
        'name':{
            prop:'name',
            type:String
        },
        'cuisine':{
            prop:'cuisine',
            type:Array
        },
        'cost':{
            prop:'cost',
            type:Number
        },
        'index':{
            prop:'index',
            type:Number
        },
        'description':{
            prop:'index',
            type:Number
        },
        'overview':{
            prop:'index',
            type:Number
        }
    }
    xlsxFile('./foods.xlsx',{ schema }).then((rows) => {
    //     //const result = await db.collection('food').insertOne({...rows}])
        result = db.collection('food').insertMany([...rows.rows])
    //     //rows.e(element => {
    //        // console.log(element)
    //         //const result = db.collection('food').insertOne({...element})
    //         //console.table(result);
    //    // });
    //     //const result = db.collection('food').insertMany([...rows])
    //     //console.table(rows);
    })

    // const result1 = ''//await db.collection('food').insertMany([{...req.body},{...req.body},{...req.body}])
    res.send({
        'status':200,
        'message': 'Food item added successfully',
        'resultWeGot':result
    })
});

app.delete('/deleteFood',async(req,res)=>{
    const mongoObjectToDelete = mongodb.ObjectId(req.body.deleteId);
    const foodCollection = db.collection('food');
    const result = await foodCollection.deleteOne({_id: mongoObjectToDelete})
    if(result.acknowledged && result.deletedCount === 1){
        res.send({
            'status':200,
            'message': 'Food item deleted successfully'
        });
    } else {
        res.send({
            'status':500,
            'message': 'DELETE OPERATION FAILED'
        });
    }
});

app.delete('/deleteAllFood',async(req,res)=>{
    const foodCollection = db.collection('food');
    const result = await foodCollection.deleteMany({})
    if(result.acknowledged){
        res.send({
            'status':200,
            'message': 'All Food item deleted successfully',
            'result':result
        });
    } else {
        res.send({
            'status':500,
            'message': 'MULTIPLE DELETE OPERATION FAILED',
            'result':result
        });
    }
    
});

app.put('/updateFood',async(req,res)=>{

    const mongoObjectToUpdate = mongodb.ObjectId(req.body._id);
    console.error(req.body);
    // What to update with
    const foodCollection = db.collection('food');

    let updatedObject = {
        'name':req.body.name,
    }


    if(req.body.cuisine){
        updatedObject = {...updatedObject,'cuisine':req.body.cuisine} 
    }

    if(req.body.cost){
        updatedObject = {...updatedObject,'cost':req.body.cost} 
    } 

    const result = await foodCollection.updateOne(
        {_id: mongoObjectToUpdate},
        {$set: updatedObject
        }
    );
    
    if(result.acknowledged && result.modifiedCount === 1){
        res.send({
            'status':200,
            'message': 'Food item modified successfully'
        });
    } else {
        res.send({
            'status':500,
            'message': 'Modification operation failed'
        });
    }
});

// CALL A SERVER AND LISTEN
app.listen(PORT,function(err){
    if(err) console.error(err)
    console.log("Server is running in port",PORT)
});
