import "styled-components/macro";
import React from "react";

import { Box, Heading, Anchor, Text, Image, ResponsiveContext } from "grommet";
import BrowserFrame from "react-browser-frame";
import { Share, Github } from "grommet-icons";

type PortfolioItemProps = {
  label: string;
  text?: string;
  link: string;
  github?: string;
  technologyList: JSX.Element;
  children?: React.ReactNode;
  imagePaths?: string[];
  iframe?: JSX.Element;
  direction?: "right" | "left";
};

export const PortfolioItem = ({
  label,
  text,
  link,
  github,
  technologyList,
  children,
  imagePaths = [],
  iframe,
  direction = "left",
}: PortfolioItemProps) => {
  const size = React.useContext(ResponsiveContext);
  const flexDir = size !== "small" && direction === "right" ? "row-reverse" : "row-responsive";

  return (
    <Box
      pad={{ horizontal: "medium", bottom: "xlarge" }}
      alignSelf="center"
      width="100%"
      border={
        size === "small"
          ? {
              color: "brand",
              size: "medium",
              style: "dashed",
              side: "bottom",
            }
          : undefined
      }
    >
      <Box direction={flexDir} gap="large">
        <Box width={{ max: size !== "small" ? "50%" : undefined }}>
          <Box>
            <Heading color="brand" level="2">
              {label}
              <Anchor href={link} icon={<Share />} target="_blank" />
            </Heading>
            {Boolean(github) && (
              <Text margin={{ bottom: "medium" }} color="accent-3">
                <Anchor reverse label="code on" icon={<Github />} href={github} />
              </Text>
            )}
          </Box>
          {Boolean(text) && (
            <Text color="accent-4" margin={{ bottom: "medium" }}>
              {text}
            </Text>
          )}
          {children}
          <Box pad={{ vertical: "medium" }}>{technologyList}</Box>
        </Box>
        <Box gap="small" width={iframe || size === "small" ? "100%" : "50%"}>
          {imagePaths.map((path) => {
            return (
              <Box key={path}>
                <BrowserFrame>
                  <Image width="100%" fit="contain" src={path} />
                </BrowserFrame>
              </Box>
            );
          })}
          <Box width="100%">{iframe}</Box>
        </Box>
      </Box>
    </Box>
  );
};
