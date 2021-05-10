import { Anchor, Box, Heading, Image, ResponsiveContext, Text } from "grommet";
import { Github, Share } from "grommet-icons";
import React from "react";
import BrowserFrame from "react-browser-frame";
import "styled-components/macro";

type PortfolioItemProps = {
  label: string;
  text?: string;
  link: string;
  github?: string;
  technologyList: JSX.Element;
  children?: React.ReactNode;
  imagePaths?: string[];
  slug?: string
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
  slug,
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
        <Box gap="small" width={size === "small" ? "100%" : "50%"}>
          {imagePaths.map((path) => {
            return (
              <Box key={path}>
                <BrowserFrame>
                  <Image width="100%" fit="contain" src={path} />
                </BrowserFrame>
              </Box>
            );
          })}
          {slug && (<Box width="100%">
            <p
              className="codepen"
              data-height="500"
              data-theme-id="39356"
              data-default-tab="result"
              data-user="carolineartz"
              data-slug-hash={slug}
              css="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
              data-pen-title={label}
            >
              <span>See the Pen <a href="https://codepen.io/carolineartz/pen/ogVXZj">{label}</a> by Caroline Artz (<a href="https://codepen.io/carolineartz">@carolineartz</a>) on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
          </Box>)}
        </Box>
      </Box>
    </Box>
  );
};
