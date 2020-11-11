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
}: PortfolioItemProps) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box fill pad="small">
      <Box direction="row-responsive" gap="medium">
        <Box width={{ max: size !== "small" ? "40vw" : undefined }}>
          <Box>
            <Heading color="brand" level="2">
              {label}
              <Anchor href={link} icon={<Share />} />
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
          <Box pad={{ horizontal: "small" }}>{technologyList}</Box>
        </Box>
        <Box gap="small">
          {imagePaths.map((path) => {
            return (
              <Box key={path} width={{ max: "40vw" }}>
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
