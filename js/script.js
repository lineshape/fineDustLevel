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


// var xhr = new XMLHttpRequest();
// var url = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'; /*URL*/
// var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'kB6%2BuNd91DO08ONrRhHgoM5duj6ujcrQGpQWh3GnGwX%2F00uYw32OrCV5Ev1FVowqgOcJdc60n%2Bhjwb4hJ5H0MA%3D%3D'; /*Service Key*/
// queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /**/
// // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
// queryParams += '&' + 'numOfRows'+ '=' + encodeURIComponent('100'); /**/
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
// queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울'); /**/
// queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('DAILY'); /**/
// // console.log(queryParams)
// xhr.open('GET', url + queryParams);
// xhr.onreadystatechange = function () {
//     if (this.readyState == 4) {
//         console.log('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
//     }
// };

// xhr.send('');

// API 키와 다른 필요한 파라미터를 변수로 설정
const API_KEY = 'kB6%2BuNd91DO08ONrRhHgoM5duj6ujcrQGpQWh3GnGwX%2F00uYw32OrCV5Ev1FVowqgOcJdc60n%2Bhjwb4hJ5H0MA%3D%3D';
const SERVICE_URL = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst';
const numOfRows = 10; // 예를 들어, 가져오고 싶은 행의 수
const pageNo = 1; // 예를 들어, 페이지 번호
const itemCode = 'PM10'; // 조회하고 싶은 항목 (PM10, PM2.5 등)
const dataGubun = 'HOUR'; // 데이터 구분 (시간별 HOUR, 일별 DAILY)
const searchCondition = 'WEEK'; // 조회 조건 (주간 WEEK, 월간 MONTH)
const sidoName = '서울'; // 시도 이름 (서울, 부산 등)
const returnType = 'json';

// 전체 URL 조합
const url = `${SERVICE_URL}?serviceKey=${API_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&itemCode=${itemCode}&dataGubun=${dataGubun}&searchCondition=${searchCondition}&sidoName=${encodeURIComponent(sidoName)}&returnType=${returnType}`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        // API를 통해 받아온 데이터를 'res' 변수에 담는다
        const res = data;
        const seoulData = res.response.body.items[0].seoul;
        const dateData = res.response.body.items[0].dataTime;

        // Date 객체 생성
        const date = new Date(dateData);

        // 연, 월, 일, 시간을 추출
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줌
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');


        if(0 <= seoulData && seoulData < 31 ) {
            document.querySelector("html").dataset.dust="clear";
            document.querySelector(".title >h2").innerText = "Clear";
            document.querySelector(".dust-grade").innerText = "좋음";
        } else if(31 <= seoulData && seoulData < 81) {
            document.querySelector("html").dataset.dust="normal";
            document.querySelector(".title >h2").innerText = "Normal";
            document.querySelector(".dust-grade").innerText = "보통";
        } else if(81 <= seoulData && seoulData < 150) {
            document.querySelector("html").dataset.dust="unheal";
            document.querySelector(".title >h2").innerText = "Unhealthy";
            document.querySelector(".dust-grade").innerText = "나쁨";
        } else {
            document.querySelector("html").dataset.dust="very-unheal";
            document.querySelector(".title >h2").innerText = "Very Unhealthy";
            document.querySelector(".dust-grade").innerText = "매우 나쁨";
        }

        document.querySelector(".loc-time").innerText = `서울, ${year}년 ${month}월 ${day}일 ${hour}시 기준`;

        console.log(dateData);
        console.log(seoulData);

    })
    .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
    });


    document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('eraseCanvas');
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.poster');
    
        // Canvas 크기를 컨테이너 또는 뷰포트 크기에 맞춥니다.
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        // Canvas를 흰색으로 채웁니다. (또는 원하는 배경색/이미지)
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        let isErasing = false;
    
        // 마우스 이벤트 리스너 설정
        canvas.addEventListener('mousedown', () => isErasing = true);
        canvas.addEventListener('mouseup', () => isErasing = false);
        canvas.addEventListener('mouseleave', () => isErasing = false);
        canvas.addEventListener('mousemove', function(e) {
            if (isErasing) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left; // Canvas 내 좌표
                const y = e.clientY - rect.top;
                const radius = 20; // "지우개" 크기
    
                // "지우개" 효과
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    });
    
    