/* Global Variables */
let baseURL1 = "http://api.openweathermap.org/geo/1.0/zip?zip=";
//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
let baseURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=";
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
let apiKey = "9270a4389173e459d3b40cc27d850051";



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", clickFunction);

async function clickFunction(event){
  let zipcode = document.getElementById("zipInput").value;

  let coordinates = await getExternalData(baseURL1, apiKey, zipcode);
  //let coordObject = JSON.parse(coordinates);

  let latitude = coordinates.lat;
  let longtitude = coordinates.lon;

  let newTemperatureData = await getExternalData2(baseURL2, apiKey, latitude, longtitude);

  let feelings = document.querySelector("#feelings").value;/////////////

  let newData = {
    lat: latitude,
    lon: longtitude,
    temperature: newTemperatureData.main.temp,
    date: newDate,
    feelings: feelings,
    userResponse: ""
  };

  console.log(newData);
  postData("http://localhost:8000/posting", newData);
  

  let recievedData = getData("/");

  console.log(recievedData);

  let dateText = document.querySelector("#date").appendChild(document.createElement("p"));
  dateText.innerText = recievedData.date;
  
  //"<p>" + recievedData.date + "</p>");
  //document.querySelector("#content").appendChild("<p>" + recievedData.feelings + "</p>");
  //document.querySelector("#temp").appendChild("<p>" + recievedData.temperature + "</p>");

  return console.log(longtitude +" " + latitude);
}

async function getData(url){
  const request = await fetch(url);

  try {
    const retData = await request.json();
    console.log(retData);
    //return responseData;
  }

  catch (error){
    console.log('error', error);

  }

}

async function postData(url, newDataSet){
    console.log(newDataSet);
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDataSet)
    });
    console.log(newDataSet);//////////////////////
    try {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    }

    catch (error){
      console.log('error', error);

    }

}




/*  const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
    // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  postData('/add', {answer:42});
*/


async function getExternalData(baseURL1, apiKey, zipcode){

    const res = await fetch(baseURL1 + zipcode + "&appid=" + apiKey)
    try{
        const dataFromAPI = await res.json();
        console.log(dataFromAPI);
       // let arrayLatLon = [dataFromAPI.lat, dataFromAPI.lon];
      //  console.log(dataFromAPI.lat);
       // console.log(dataFromAPI.lon);
        return dataFromAPI;
    }

    catch(error){
        console.log("An error appeared: ", error);

    }

}

async function getExternalData2(baseURL2, apiKey, latitude, longtitude){
  const res = await fetch(baseURL2 + latitude + "&lon=" + longtitude + "&appid=" + apiKey + "&units=metric")

  try{
    const dataFromAPI = await res.json();
    console.log(dataFromAPI);
    return dataFromAPI;
  }

  catch(error){
    console.log("An error in phase 2 appeared: ", error);

  }  

}

/////////////////////////////////////////




