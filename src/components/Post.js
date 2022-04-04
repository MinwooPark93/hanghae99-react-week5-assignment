import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import { Grid, Image, Text } from "../elements"

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
          <Image shape="rectangle" src={props.src}/>
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
        <div>user profile / user name / insert_dt / is_me (edit btn)</div>
        <div>contents</div>
        <div>image</div>
        <div>comment cnt</div>
      </Grid>
    </React.Fragment>
  );
}

let year = new Date().getFullYear();
let month = new Date().getMonth();
let date = new Date().getDate();
// 오류 방지 및 화면 깨짐을 방지하기 위해 필요한 props 정보들을 미리 작성.
Post.defaultProps = {
  user_info: {
    user_name: "minwoo",
    user_profile: "https://avatars.githubusercontent.com/u/79454069?v=4",
  },
  image_url: "https://avatars.githubusercontent.com/u/79454069?v=4",
  contents: "안녕하세요",
  comment_cnt: 10,
  insert_dt: year + '/' + month + '/' + date
};

export default Post;