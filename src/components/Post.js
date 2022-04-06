import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import { Grid, Image, Text } from "../elements";

const Post = (props) => {
    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex>
                    <Image shape="circle" src={props.src} />
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.image_url} />
                </Grid>
                <Grid padding="16px">
                    <Text margin="0" bold>
                        댓글 {props.comment_cnt}개
                    </Text>
                </Grid>
                <div>
                    user profile / user name / insert_dt / is_me (edit btn)
                </div>
                <div>contents</div>
                <div>image</div>
                <div>comment cnt</div>
            </Grid>
        </React.Fragment>
    );
};

// 오류 방지 및 화면 깨짐을 방지하기 위해 필요한 props 정보들을 미리 작성.
Post.defaultProps = {
    user_info: {
        user_name: "minwoo",
        user_profile:
            "https://pixabay.com/get/g4e57976fd66503fcfa2759d82b55ecbd9226bf1fa134591da5c22d89cd95e0c7a20f20db3af5b449c1d96a78dc4b7e6df8b3ff50ae2a296754f5740e9c78dfc5e1114e92eacfae0fb72c381536d50162_1920.jpg",
    },
    image_url:
        "https://pixabay.com/get/g4e57976fd66503fcfa2759d82b55ecbd9226bf1fa134591da5c22d89cd95e0c7a20f20db3af5b449c1d96a78dc4b7e6df8b3ff50ae2a296754f5740e9c78dfc5e1114e92eacfae0fb72c381536d50162_1920.jpg",
    contents: "안녕하세요",
    comment_cnt: 10,
    insert_dt: "2022-02-02 22:22:22",
};

export default Post;
