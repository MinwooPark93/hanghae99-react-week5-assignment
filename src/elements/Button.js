import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const { text, _onClick, is_float, children, margin, width } = props;

    if (is_float) {
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>
                    {text ? text : children}
                </FloatButton>
            </React.Fragment>
        );
    }

    const styles = {
        margin: margin,
        width: width,
    };

    return (
        <React.Fragment>
            <ElButton {...styles} onClick={_onClick}>
                {text ? text : children}
            </ElButton>
        </React.Fragment>
    );
};

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => {},
    is_float: false,
    margin: false,
    width: "100%",
};

export default Button;

const ElButton = styled.button`
    width: ${(props) => props.width};
    background-color: #212121;
    color: #fff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #212121;
    color: #fff;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
