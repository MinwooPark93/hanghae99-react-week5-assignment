import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
    const is_login = useSelector((state) => state.user.is_login);
    console.log(is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    if (is_session && is_login) {
        // 둘다 트루일때 반환.
        return <React.Fragment>{props.children}</React.Fragment>;
    }
    console.log(is_session);
    console.log(is_login);

    return null;
};

export default Permit;

// 이게 지금 session 때문에 사용하는거죠 permit 이 ???
// 로그인여부에 따라 permit 내용을 렌더링 해주려고 사용.
