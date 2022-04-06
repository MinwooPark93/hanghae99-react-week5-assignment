import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

// action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// actionCreator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
    post_id,
    post,
}));
const deletePost = createAction(DELETE_POST, (post_list) => ({ post_list }));

// initialState
const initialState = {
    list: [],
};

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "minwoo",
    //     user_profile:
    //         "https://pixabay.com/get/g4e57976fd66503fcfa2759d82b55ecbd9226bf1fa134591da5c22d89cd95e0c7a20f20db3af5b449c1d96a78dc4b7e6df8b3ff50ae2a296754f5740e9c78dfc5e1114e92eacfae0fb72c381536d50162_1920.jpg",
    // },
    image_url:
        "https://firebasestorage.googleapis.com/v0/b/image-community-3e20a.appspot.com/o/images%2FR38VaiEepQRpNCfYIj1F8WgiVOG3_1649226556656?alt=media&token=c59fd633-d47e-48b6-a368-e1d473beeea2",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            console.log("게시물 정보가 없습니다.");
            return;
        }
        const _image = getState().image.preview;

        const _post_idx = getState().post.list.findIndex(
            (p) => p.id === post_id
        );
        const _post = getState().post.list[_post_idx];

        const postDB = firestore.collection("post");

        console.log(_post);

        if (_image === _post.image_url) {
            postDB
                .doc(post_id)
                .update(post)
                .then((doc) => {
                    dispatch(editPost(post_id, { ...post }));
                    history.replace("/");
                });
            return;
        } else {
            const user_id = getState().user.user.uid;
            const _upload = storage
                .ref(`images/${user_id}_${new Date().getTime()}`)
                .putString(_image, "data_url");

            _upload.then((snapshot) => {
                snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        return url;
                    })
                    .then((url) => {
                        postDB
                            .doc(post_id)
                            .update({ ...post, image_url: url })
                            .then((doc) => {
                                dispatch(
                                    editPost(post_id, {
                                        ...post,
                                        image_url: url,
                                    })
                                );
                                history.replace("/");
                            });
                    })
                    .catch((err) => {
                        window.alert("이미지 업로드에 문제가 발생했습니다.");
                        console.log(
                            "이미지 업로드에 문제가 발생했습니다.",
                            err
                        );
                    });
            });
        }
    };
};

const addPostFB = (contents = "") => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");

        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        const _image = getState().image.preview;

        // console.log(_image);
        // console.log(typeof _image);

        const _upload = storage
            .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
            .putString(_image, "data_url");

        _upload.then((snapshot) => {
            snapshot.ref
                .getDownloadURL()
                .then((url) => {
                    return url;
                })
                .then((url) => {
                    postDB
                        .add({ ...user_info, ..._post, image_url: url })
                        .then((doc) => {
                            let post = {
                                user_info,
                                ..._post,
                                id: doc.id,
                                image_url: url,
                            };
                            dispatch(addPost(post));
                            history.replace("/");

                            dispatch(imageActions.setPreview(null));
                        })
                        .catch((err) => {
                            window.alert("Post 작성에 문제가 발생했습니다.");
                            console.log("post 작성에 실패했습니다.", err);
                        });
                })
                .catch((err) => {
                    window.alert("이미지 업로드에 문제가 발생했습니다.");
                    console.log("이미지 업로드에 문제가 발생했습니다.", err);
                });
        });
    };
};

const deletePostFB = (post_id = null) => {
    return function (dispatch, getState) {
        const postDB = firestore.collection("post");
        postDB
            .doc(post_id)
            .delete()
            .then(() => {
                dispatch(deletePost(post_id));
                console.log(post_id);
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };
};

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");

        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc) => {
                let _post = doc.data();

                // dictionary 의 key값들을 배열로 만들어준다.
                let post = Object.keys(_post).reduce(
                    (acc, cur) => {
                        if (cur.indexOf("user_") !== -1) {
                            return {
                                ...acc,
                                user_info: {
                                    ...acc.user_info,
                                    [cur]: _post[cur],
                                },
                            };
                        }
                        return { ...acc, [cur]: _post[cur] };
                    },
                    { id: doc.id, user_info: {} }
                );
                post_list.push(post);
                // console.log(doc.id, doc.data());
                // let _post = {
                //     id: doc.id,
                //     ...doc.data(),
                // };
                // let post = {
                //     id: doc.id,
                //     user_info: {
                //         user_name: _post.user_name,
                //         user_profile: _post.user_profile,
                //         user_id: _post.user_id,
                //     },
                //     image_url: _post.image_url,
                //     contents: _post.contents,
                //     comment_cnt: _post.comment_cnt,
                //     insert_dt: _post.insert_dt,
                // };
                // post_list.push(post);
            });
            // console.log(post_list);

            dispatch(setPost(post_list));
        });
    };
};

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.post_list;
            }),

        [ADD_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list.unshift(action.payload.post);
            }),
        [EDIT_POST]: (state, action) =>
            produce(state, (draft) => {
                let idx = draft.list.findIndex(
                    (p) => p.id === action.payload.post_id
                );

                draft.list[idx] = {
                    ...draft.list[idx],
                    ...action.payload.post,
                };
            }),
        [DELETE_POST]: (state, action) =>
            produce(state, (draft) => {
                console.log(action);
                draft.list = state.list.filter(
                    (p) => p.id !== action.payload.post_list
                );
            }),
    },
    initialState
);

const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
    deletePostFB,
};

export { actionCreators };
