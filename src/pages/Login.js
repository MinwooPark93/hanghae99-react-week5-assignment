import React, { useState } from "react";
import { Text, Input, Grid, Button } from "../elements";
// login기능에 사용할 cookie import
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
    // console.log(getCookie("user_id"));
    // const [id, setId] = React.useState("");
    // const [pwd, setPwd] = React.useState("");

    // const changeId = (e) => {
    //     setId(e.target.value);
    // };

    // const changePwd = (e) => {
    //     setPwd(e.target.value);
    // };
    // 로그인버튼에 콜백함수로 넣어줄 로그인함수를 만든다.
    // const login = () => {
    //     setCookie("user_id", id, 3);
    //     setCookie("user_pwd", pwd, 3);
    // };
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const login = () => {
        if (id === "" || pwd === "") {
            window.alert("아이디 혹은 비밀번호를 입력해주세요");
            return;
        }
        dispatch(userActions.loginFB(id, pwd));
    };
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>
                    로그인
                </Text>
                <Grid padding="16px 0">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Grid>
                <Grid padding="16px 0">
                    <Input
                        label="패스워드"
                        placeholder="패스워드를 입력해주세요."
                        type="password"
                        _onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </Grid>
                <Button
                    text="로그인하기"
                    _onClick={() => {
                        console.log("로그인했어!!!!!!!");
                        login();
                    }}
                ></Button>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
