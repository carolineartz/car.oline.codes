import { Box } from "grommet";
import FadeIn from "./FadeIn";

export const CodingCatEmbed = () => {
  return (
    <Box width="100%" height="100vh" background="#1b1e2d">
      {true && (
        <Box key="foo" align="end" justify="end">

          <FadeIn
            delay={250} duration={450}
            style={{
              maxHeight: "100%",
              backgroundColor: "#1b1e2d",
              height: "100vh",
              width: "100%",
              background: "transparent",
            }}>
              <iframe
                height="100%"
                style={{
                  maxHeight: "100%",
                  backgroundColor: "#1b1e2d",
                  height: "100vh",
                  width: "100%",
                  background: "transparent",
                }}
                scrolling="no"
                title="Bongo Cat Codes #2 - Jamming"
                src="https://codepen.io/carolineartz/embed/qBOEzQa?height=300&theme-id=39339&default-tab=result"
                frameBorder="no"
                allowFullScreen
              >
                See the Pen <a href="https://codepen.io/carolineartz/pen/qBOEzQa">Bongo Cat Codes #2 - Jamming</a>{" "}
              by Caroline Artz (<a href="https://codepen.io/carolineartz">@carolineartz</a>) on{" "}
                <a href="https://codepen.io">CodePen</a>.
            </iframe>
            </FadeIn>

        </Box>
      )}
    </Box>
  );
};
