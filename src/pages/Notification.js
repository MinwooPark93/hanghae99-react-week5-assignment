import React from "react";
import { Grid, Text, Image } from "../elements";

const Notification = (props) => {
    let noti = [
        { user_name: "aaaaa", post_id: "post1", image_url: "" },
        { user_name: "aaaaa", post_id: "post2", image_url: "" },
        { user_name: "aaaaa", post_id: "post3", image_url: "" },
        { user_name: "aaaaa", post_id: "post4", image_url: "" },
        { user_name: "aaaaa", post_id: "post5", image_url: "" },
        { user_name: "aaaaa", post_id: "post6", image_url: "" },
    ];
    return (
        <React.Fragment>
            <Grid padding="16px" bg="#eff6ff">
                {noti.map((n) => {
                    return (
                        <Grid
                            key={n}
                            padding="16px"
                            is_flex
                            bg="#fff"
                            margin="8px 0"
                        >
                            <Grid width="auto" margin="0 8px 0 0">
                                <Image shape="rectangle" />
                            </Grid>
                            <Grid>
                                <Text>
                                    <b>{n.user_name}</b>님이 게시글에 댓글을
                                    남겼습니다.
                                </Text>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default Notification;
