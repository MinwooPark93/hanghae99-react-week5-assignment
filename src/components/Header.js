import React, { useState, useEffect } from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";
import Permit from "../shared/Permit";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    // console.log(is_session);
    // console.log(_session_key);
    // console.log(sessionStorage.getItem(_session_key));

    // useEffect(() => {
    //     // 쿠키를 가져온다
    //     let cookie = getCookie("user_id");
    //     // console.log 로 찍어봄
    //     console.log(cookie);
    //     // 쿠키가 있으면?
    //     if (cookie) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // });

    if (!is_login && !is_session) {
        return (
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>
                        Hello, World
                    </Text>
                </Grid>

                <Grid is_flex>
                    <Button
                        text="로그인"
                        _onClick={() => {
                            history.push("/login");
                        }}
                    ></Button>
                    <Button
                        text="회원가입"
                        _onClick={() => {
                            history.push("/signup");
                        }}
                    ></Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <React.Fragment>
            <Permit>
                <React.Fragment>
                    <Grid is_flex padding="4px 16px">
                        <Grid>
                            <Text margin="0px" size="24px" bold>
                                Hello, World
                            </Text>
                        </Grid>

                        <Grid is_flex>
                            <Button text="내정보"></Button>
                            <Button text="알림"></Button>
                            <Button
                                text="로그아웃"
                                _onClick={() => {
                                    dispatch(userActions.logoutFB());
                                }}
                            ></Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Permit>
        </React.Fragment>
    );
};

Header.defaultProps = {};

export default Header;
