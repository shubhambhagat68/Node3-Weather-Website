const request = require('request')


const forcast=(address,callback)=>{

	const url ='http://api.weatherstack.com/current?access_key=dc48ffd4b5e7d98d582d1aa8e8e505c6&query='+encodeURIComponent(address)

	request({url,json:true},(error,{body})=>{			//request({url,json:true},(error,response) here we are not using destructuring of object but in actual code we have used destructuring of object to only take body of object

		if(error){
			callback('Unable to connect to server!!.',undefined)
		}
		else if(body.error){
			callback('Unable to find the given location. Plz Try another.',undefined)
		}
		else{
			const completeLocation=body.location.name+", "+body.location.region+", "+body.location.country;
			
			callback(undefined,{
				location: completeLocation,
				temperature: body.current.temperature,
				precip: body.current.precip,
				descriptions:'The temperature is ' +body.current.temperature+ '°C. And '+body.current.precip +'% chances of rain.\nWeather Descriptions: '+ body.current.weather_descriptions
			})

		}

	})

}



module.exports=forcast