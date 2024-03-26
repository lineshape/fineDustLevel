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
        // const seoulData = 90;
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
            document.querySelectorAll("h2")[0].innerText = "Clear";
            document.querySelectorAll("h2")[1].innerText = "Clear";
            document.querySelector(".dust-grade").innerText = "좋음";
        } else if(31 <= seoulData && seoulData < 81) {
            document.querySelector("html").dataset.dust="normal";
            document.querySelectorAll("h2")[0].innerText = "Normal";
            document.querySelectorAll("h2")[1].innerText = "Normal";
            document.querySelector(".dust-grade").innerText = "보통";
        } else if(81 <= seoulData && seoulData < 150) {
            document.querySelector("html").dataset.dust="unheal";
            document.querySelectorAll("h2")[0].innerText = "Unhealthy";
            document.querySelectorAll("h2")[1].innerText = "Unhealthy";
            document.querySelector(".dust-grade").innerText = "나쁨";
        } else {
            document.querySelector("html").dataset.dust="very-unheal";
            document.querySelectorAll("h2")[0].innerText = "Very Unhealthy";
            document.querySelectorAll("h2")[1].innerText = "Very Unhealthy";
            document.querySelector(".dust-grade").innerText = "매우 나쁨";
        }

        document.querySelector(".loc-time").innerText = `서울, ${year}년 ${month}월 ${day}일 ${hour}시 기준`;

        console.log(dateData);
        console.log(seoulData);

    })
    .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
    });

const pos = document.documentElement;
pos.addEventListener('mousemove', e => {
    pos.style.setProperty('--x', `${e.clientX}px`);
    pos.style.setProperty('--y', `${e.clientY}px`);
})