// getCookie는 name이라는 key로 value를 가져온다
const getCookie = (name) => {
    // 쿠키 값을 가져온다
    let value = "; " + document.cookie;
    // 키 값을 기준으로 파싱
    let parts = value.split(`; ${name}=`); // [aa==xx / aaa; abbb=sssss;]
    // value return
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

// key, value, 만료일을 가져온다
const setCookie = (name, value, exp = 5) => {
    // new Date로 시간 생성하여 받아옴
    // date의 시간을 getTime으로 받아와서 expires을 하루만큼 더해줌
    let date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

// 쿠키 삭제를 위해 만료일을 과거로 설정
const deleteCookie = (name) => {
    let date = new Date("2020-01-01").toUTCString();

    console.log(date);

    document.cookie = name + "=; expires=" + date;
};

// 다른곳에서 사용하기 위해 export       // Login.js로 넘어감
export { getCookie, setCookie, deleteCookie };
