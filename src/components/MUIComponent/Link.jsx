import styled from "@emotion/styled";
import { Link as MuiLink } from "@mui/material";
import React from "react";

const LinkContent = styled(MuiLink)`
  text-decoration: none;
  font-size: 16px;
  font-family: inter, sans-serif;
  display: flex;
  align-items: center;
  margin: 5px 0;

  &:hover {
    color: ${(props) => props.hoverColor || "black"};
  }
`;

const Link = ({ color, hoverColor, href, children, style }) => {
  return (
    <LinkContent
      color={color}
      hoverColor={hoverColor}
      href={href}
      style={style}
    >
      {children}
    </LinkContent>
  );
};

export default Link;
