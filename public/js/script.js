// 전역변수 선언
let user_sido;

// 전체적 접근
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            reverseGeocode(coords.latitude, coords.longitude);
        }, (error) => {
            console.error('위치 정보 접근 권한이 거부되었거나, 위치를 확인할 수 없습니다.');
        });
    } else {
        console.log('이 브라우저에서는 Geolocation을 지원하지 않습니다.');
    }


// 유저 현재위치 시도 표시
const writeUserSido = (user_sido) => {
    document.querySelector('.user-sido').innerText = user_sido;
};

// 역지오코딩 API
const reverseGeocode = (latitude, longitude) => {
    const apiKey = '8a14c8f216ee855cf46a2e4b8c8ffce9'; // 카카오 API 키를 여기에 입력하세요
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `KakaoAK ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.documents && data.documents.length > 0) {
            // documents 배열에서 첫 번째 항목의 지역 이름을 출력
            user_sido = data.documents[0].region_1depth_name;
            writeUserSido(user_sido);
            user_sido = translate_en[user_sido];
            getDust();
        } else {
            console.log('해당 위치의 지역 정보를 찾을 수 없습니다.');
        }
    })
    .catch(error => {
        console.error('역지오코딩 요청 중 오류 발생:', error);
    });
}


// Geolocation API
const success = ({coords}) => {

    console.log(coords.latitude);
    
};

const getUserLocation = () => {
    if(!navigator.geolocation) {
        alert("위치 정보 액세스를 허용해주세요!")
    }else{
        navigator.geolocation.getCurrentPosition(success);
    }
   
};

// 시도이름 영-한 변환
const translate_en = {
  "부산광역시" : "busan",
  "충청북도" : "chungbuk",
  "충청남도" : "chungnam",
  "대구광역시" : "daegu",
  "대전광역시" : "daejeon",
  "강원특별자치도" : "gangwon",
  "광주광역시" : "gwangju",
  "경상북도" : "gyeongbuk",
  "경기도" : "gyeonggi",
  "경상남도" : "gyeongnam",
  "인천광역시" : "incheon",
  "제주특별자치도" : "jeju",
  "전북특별자치도" : "jeonbuk",
  "전라남도" : "jeonnam",
  "세종특별자치시" : "sejong",
  "서울특별시" : "seoul",
  "울산광역시" : "ulsan",
}

// 미세먼지 API
const getDust = () => {
    const API_KEY = 'kB6%2BuNd91DO08ONrRhHgoM5duj6ujcrQGpQWh3GnGwX%2F00uYw32OrCV5Ev1FVowqgOcJdc60n%2Bhjwb4hJ5H0MA%3D%3D';
    const SERVICE_URL = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst';
    const numOfRows = 10; // 예를 들어, 가져오고 싶은 행의 수
    const pageNo = 1; // 예를 들어, 페이지 번호
    const itemCode = 'PM10'; // 조회하고 싶은 항목 (PM10, PM2.5 등)
    const dataGubun = 'HOUR'; // 데이터 구분 (시간별 HOUR, 일별 DAILY)
    const searchCondition = 'WEEK'; // 조회 조건 (주간 WEEK, 월간 MONTH)
    // const sidoName = '서울'; // 시도 이름 (서울, 부산 등)
    const returnType = 'json';

    
    const URL = `${SERVICE_URL}?serviceKey=${API_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&itemCode=${itemCode}&dataGubun=${dataGubun}&searchCondition=${searchCondition}&returnType=${returnType}`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // API를 통해 받아온 데이터를 'res' 변수에 담는다      
            const res = data;
            const dustData = res.response.body.items[0][user_sido];
            // const dustData = 60;
            const dateData = res.response.body.items[0].dataTime;

            // Date 객체 생성
            const date = new Date(dateData);

            // 연, 월, 일, 시간을 추출
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줌
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            let background;

            const chooseBackground = () => {

                if(31 <= dustData && dustData < 81) {
                    background = document.querySelector('.poster.background.normal');
                } else if(81 <= dustData && dustData < 150) {
                    background = document.querySelector('.poster.background.unheal');
                } else {
                    background = document.querySelector('.poster.background.very-unheal');
                }
                
            }

            const drawDust = () => {
                const dust = document.createElement('div');
                dust.className = "dust";
                dust.style.top = 100*Math.random()+'%';
                dust.style.left = 100*Math.random()+'%';
            
                chooseBackground();
                background.appendChild(dust);
                
            };


            // 배경 먼지 생성
            const createDust = (i) => {
                while(i){
                    drawDust();
                    i-=1;
                }
            };

            if(0 <= dustData && dustData < 31 ) {
                document.querySelector("html").dataset.dust="clear";
                document.querySelectorAll("h2")[0].innerText = "Clear";
                document.querySelectorAll("h2")[1].innerText = "Clear";
                document.querySelector(".dust-grade").innerText = "좋음";
                risingHeart(5000);
                document.addEventListener("click", createHeart);
            } else if(31 <= dustData && dustData < 81) {
                document.querySelector("html").dataset.dust="normal";
                document.querySelectorAll("h2")[0].innerText = "Normal";
                document.querySelectorAll("h2")[1].innerText = "Normal";
                document.querySelector(".dust-grade").innerText = "보통";
                createDust(dustData * 10);
                // createStars(100);
                // selectStars();
                // animateStars();
            } else if(81 <= dustData && dustData < 150) {
                document.querySelector("html").dataset.dust="unheal";
                document.querySelectorAll("h2")[0].innerText = "Unhealthy";
                document.querySelectorAll("h2")[1].innerText = "Unhealthy";
                document.querySelector(".dust-grade").innerText = "나쁨";
                createDust(dustData * 10);
            } else {
                document.querySelector("html").dataset.dust="very-unheal";
                document.querySelectorAll("h2")[0].innerText = "Very Unhealthy";
                document.querySelectorAll("h2")[1].innerText = "Very Unhealthy";
                document.querySelector(".dust-grade").innerText = "매우 나쁨";
                createDust(dustData * 10);
            }

            document.querySelector(".time").innerText = `${year}년 ${month}월 ${day}일 ${hour}시 기준`;

            console.log('현재 위치는 '+user_sido+' 이며, 미세먼지 농도는 '+dustData+'㎍/m³입니다. '+dateData+'에 갱신된 정보입니다.');

        })
        .catch(error => {
            console.error('미세먼지 API 호출 중 오류 발생:', error);
        });

}



const pos = document.documentElement;
pos.addEventListener('mousemove', e => {
    pos.style.setProperty('--x', `${e.x}px`);
    pos.style.setProperty('--y', `${e.y}px`);
});

document.addEventListener('mousemove', function(e) {
    moveDust(e.clientX, e.clientY);
});

function moveDust(mouseX, mouseY) {
    const dustElements = document.querySelectorAll('.dust');
    dustElements.forEach(function(dust) {
        const rect = dust.getBoundingClientRect();
        const dustX = rect.left + window.scrollX + rect.width / 2; // window.scrollX/Y를 추가하여 절대 위치 계산
        const dustY = rect.top + window.scrollY + rect.height / 2;
        const diffX = mouseX - dustX;
        const diffY = mouseY - dustY;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        const maxDistance = 200; // 마우스로부터 최대 반응 거리

        if (distance < maxDistance) {
            const angle = Math.atan2(diffY, diffX);
            const moveX = Math.cos(angle) * maxDistance;
            const moveY = Math.sin(angle) * maxDistance;
            dust.style.transform = `translate(${-moveX/2}px, ${-moveY/2}px)`;
        } else {
            dust.style.transform = '';
        }
    });
}


// clear 포스터 배경

const risingHeart = (count) => {

    const background = document.querySelector('.poster.background.clear');

    for(let i = 0; i < count; i++) {
        
        const heart = document.createElement('span');

        setTimeout(() => {
            heart.innerText = '♡';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-300px';
            background.appendChild(heart);

            heart.style.animation = 'heart-rise 7s ease-out forwards';

            heart.addEventListener('animationend', function() {
                heart.remove();
            })
        }, i * 1300);
        
    }
    
}

const createHeart = (e) => {

    const background = document.querySelector('.poster.background.clear');
    const heart = document.createElement('span');

    heart.innerText = '♡';
    heart.style.left = `${e.x - window.innerWidth * 0.03}px`;
    heart.style.top = `${e.y - window.innerHeight * 0.03}px`;
    background.appendChild(heart);

    heart.style.animation = 'heart-rise 7s ease-out forwards';
    heart.addEventListener('animationend', function() {
        heart.remove();})
    }





