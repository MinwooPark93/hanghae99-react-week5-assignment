import styled from "styled-components";
import React from "react";

const Image = (props) => {
    const { shape, src, size } = props;

    const styles = {
        src: src,
        size: size,
    };

    if (shape === "circle") {
        return <ImageCircle {...styles}></ImageCircle>;
    }

    if (shape === "rectangle") {
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        );
    }
    return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
    shape: "rectangle",
    src: "https://pixabay.com/get/g4e57976fd66503fcfa2759d82b55ecbd9226bf1fa134591da5c22d89cd95e0c7a20f20db3af5b449c1d96a78dc4b7e6df8b3ff50ae2a296754f5740e9c78dfc5e1114e92eacfae0fb72c381536d50162_1920.jpg",
    size: 36,
};

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

export default Image;
