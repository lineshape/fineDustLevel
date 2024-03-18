// const get_weather = async(lat, long) => {
//     try{
//         // 아래 부분에 API Key를 삽입해주세요
//         const api_key = "Your API KEY";
//         const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
//         const res = await req.json();
        
//         const weather = res.weather[0].main;
//         const location = res.name;
        
        
//         document.querySelector(".location").innerText = location
//         document.querySelector(".title h1").innerText =translation_kr[weather.toLowerCase().split(" ").join("_")]
//         document.querySelector(".title h2").innerText = weather

//         //
// // 
// // 

//         if(weather.toLowerCase().includes("clear")){
//             document.querySelector("html").dataset.weather="sunny";
//             window.addEventListener("mousemove", sunnyMove);

//         }else if(weather.toLowerCase().includes("rain")){
//             document.querySelector("html").dataset.weather="rain";
//             window.addEventListener("mousemove", rainMove)

//         }else if(weather.toLowerCase().includes("snow")){
//             document.querySelector("html").dataset.weather="snow";
//             window.addEventListener("click",snowClick);

//         }else if(weather.toLowerCase().includes("cloud")){
//             document.querySelector("html").dataset.weather="cloudy";
//             window.addEventListener("click", cloudClick)
//         }else{}



//         document.querySelector(".latitude").innerText = ConvertDDToDMS(res.coord.lat, true)
//         document.querySelector(".longitude").innerText = ConvertDDToDMS(res.coord.lon, false)

        
//     }catch(err){
//         console.log(err);
//         // throw err;
//     }
//     // lat = coords.latitude
//     // long = coords.longitude
    
// // 

// }

/* Javascript 샘플 코드 */


var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'kB6%2BuNd91DO08ONrRhHgoM5duj6ujcrQGpQWh3GnGwX%2F00uYw32OrCV5Ev1FVowqgOcJdc60n%2Bhjwb4hJ5H0MA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /**/
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
queryParams += '&' + 'numOfRows'+ '=' + encodeURIComponent('100'); /**/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울'); /**/
queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('DAILY'); /**/
// console.log(queryParams)
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');