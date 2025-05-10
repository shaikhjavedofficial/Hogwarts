import { Paper } from "@mui/material";
import React, { useMemo } from "react";
import Carousel from "react-material-ui-carousel";
import {
  show1,
  show10,
  show2,
  show3,
  show4,
  show5,
  show6,
  show7,
  show8,
  show9,
} from "~/src/Utils/ASSETS";

const CustomCarousel: React.FC = () => {
  const eventPhotos = useMemo(
    () => [
      show1,
      show2,
      show3,
      show4,
      show5,
      show6,
      show7,
      show8,
      show9,
      show10,
    ],
    []
  );
  return (
    <Carousel
      animation="slide"
      autoPlay={true}
      interval={2500}
      navButtonsAlwaysVisible={true}
      sx={{ width: "100%", height: "60vh", marginBottom: "1rem" }}
    >
      {eventPhotos.map((item, index) => (
        <Paper key={index} onClick={(e) => e.stopPropagation()}>
          <img
            src={item.src}
            alt={item.alt}
            style={{
              objectFit: "fill",
              width: "100%",
              height: "60vh",
            }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
