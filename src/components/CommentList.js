import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = () => {
    return (
        <React.Fragment>
            <Grid padding="16px">
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </Grid>
        </React.Fragment>
    );
};

export default CommentList;

const CommentItem = (props) => {
    const { user_propfile, user_name, user_id, post_id, contents, insert_dt } =
        props;
    return (
        <Grid is_flex>
            <Grid is_flex width="auto">
                <Image shape="circle" />
                <Text bold>{user_name}</Text>
            </Grid>
            <Grid is_flex margin="0 4px">
                <Text margin="0">{contents}</Text>
                <Text margin="0">{insert_dt}</Text>
            </Grid>
        </Grid>
    );
};

CommentItem.defaultProps = {
    user_propfile: "",
    user_name: "Minwoo",
    user_id: "",
    post_id: 1,
    contents: "댓글인듯 댓글아닌 댓글같은 짭댓글",
    insert_dt: "2022-02-02 22:22:22",
};
