const path=require('path')
const express = require('express')
const hbs = require('hbs')
const forecast=require('./utils/forecast')

const app = express();

// Define path for Express Confir
const publicDictoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup for Handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory  to serve
app.use(express.static(publicDictoryPath))


app.get('',(req,res)=>{

	res.render('index',{
		title:"Weather",
		name:"Shubham Bhagat"
	})

})

app.get('/about',(req,res)=>{
	
	res.render('about',{
		title:"About",
		name:"Shubham Bhagat"
	})

})

app.get('/help',(req,res)=>{
	
	res.render('help',{
		title: "Help Page",
		name:"Shubham Bhagat"
	})
})

app.get('/weather',(req,res)=>{

	const address=req.query.address

	if(!address)
		return res.send("You much Provide a term")
	
	forecast(address,(error,data)=>{
	
		if(error)
			return res.send({error})
		else
		{
			return res.send({
				location: data.location,
				temperature: data.temperature,
				precip: data.precip,
				forecast: data.descriptions
			})
		}

	})
})


app.get('/product',(req,res)=>{

	if(!req.query.search){
		return res.send({
			title:"You much Provide a term"
		})
	}
	

	res.send({
		products:[]
	})

})



app.get('/help/*',(req,res)=>{

res.render('404',{
	title:"404",
	error:"Help Article Not Found",
	name:"Shubham Bhagat"
})

})


app.get('*',(req,res)=>{

res.render('404',{
  	title:"ERROR 404 ",
	error:"Page Not Found",
	name:"Shubham Bhagat"
})

})


app.listen(3000,()=>{

	console.log("Server is running at 3000 port")
})
