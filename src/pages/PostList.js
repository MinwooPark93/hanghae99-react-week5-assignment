// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);

    // console.log(post_list);

    React.useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
    }, []);
    return (
        <React.Fragment>
            {/* <Post /> */}
            {post_list.map((cur, idx) => {
                if (cur.user_info.user_id === user_info?.uid) {
                    return <Post key={cur.id} {...cur} is_me />;
                } else {
                    return <Post key={cur.id} {...cur} />;
                }
            })}
        </React.Fragment>
    );
};

export default PostList;
