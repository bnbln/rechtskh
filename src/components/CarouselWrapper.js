import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const CarouselWrapper = ({ images, title }) => {
  const [heroState, setHeroState] = useState(0);
  const [hoverState, setHoverState] = useState(false);
  useEffect(() => {
    if (hoverState === false) {
      const intervalId = setInterval(() => {
        if (heroState === 0) {
          setHeroState(1);
        } else {
          setHeroState(0);
        }
      }, 6500);
      return () => clearInterval(intervalId);
    }
  }, [hoverState, heroState]);

  function setToggle(input) {
    setHeroState(input);
    setHoverState(true);
  }
  var timingfunction = "3s cubic-bezier(0.45, 0, 0.55, 1)";
  console.log(title);
  return (
    <>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              width:"100%",
              height: "100%",
              margin: 0,
              padding: 0,
              transform: "translateX(-16px) scale(0.94)"
            }}
          >

            <div
              style={{
                height: heroState === 0 ? "100%" : "80%",
                width: heroState === 0 ? "68%" : "30%",
                position: "absolute",
                transition: timingfunction
              }}
            onMouseOut={() => setHoverState(false)}
            onMouseOver={() => setToggle(0)}
            onFocus={() => setToggle(0)}
            onBlur={() => setHoverState(false)}
            >
                <Link to={images[0].link}>
                <h1
              style={{
                position: "absolute",
                maxWidth: 100,
                left: 5,
                bottom: 0,
                zIndex: 10,
                marginLeft: "2rem",
                marginBottom: "2rem",
                color: "white",
                fontWeight: 700,
                lineHeight: 1,
                textShadow: "0 0 20px black",
                transition: timingfunction,
                opacity: heroState === 0 ? 1 : 0,
                transform:
                  heroState === 0 ? "translateX(0px)" : "translateX(-370px)",
              }}
            >
              {images[0].title}
            </h1>

              <PreviewCompatibleImage
                style={{
                  objectFit: "cover"
                }}
                imageInfo={{
                  image: images[0].image,
                  alt: images[0].title,
                  style: {
                    borderRadius: "0px",
                    maxWidth: "none",
                    height: "100%",
                  },
                }}
              />
            </Link>
            </div>

            <div
              style={{
                height: heroState === 1 ? "100%" : "80%",
                width: heroState === 1 ? "68%" : "30%",
                right: 0,
                position: "absolute",
                transition: timingfunction
              }}
              onMouseOut={() => setHoverState(false)}
        onMouseOver={() => setToggle(1)}
            >
                <Link to={images[1].link}>
                <h1
              style={{
                position: "absolute",
                maxWidth: 200,
                left: 5,
                bottom: 0,
                zIndex: 10,
                marginLeft: "2rem",
                marginBottom: "2rem",
                color: "white",
                fontWeight: 700,
                lineHeight: 1,
                transition: timingfunction,
                textShadow: "0 0 20px black",
                opacity: heroState === 1 ? 1 : 0,
                transform:
                  heroState === 1 ? "translateX(0px)" : "translateX(370px)",
              }}
            >
              {images[1].title}
            </h1>
              <PreviewCompatibleImage
                style={{
                  objectFit: "cover"
                }}
                imageInfo={{
                  image: images[1].image,
                  alt: images[1].title,
                  style: {
                    borderRadius: "0px",
                    maxWidth: "none",
                    height: "100%",
                  },
                }}
              />
              </Link>

            </div>

          </div>




      {/* <div
        sm={heroState === 0 ? 2 : 10}
        md={heroState === 0 ? 2 : 10}
        lg={heroState === 0 ? 3 : 8}
        className="window02"
        style={{
          height: "70%",
          maxHeight: heroState === 1 ? "700px" : "800px",
          transition: timingfunction,
        }}
        onMouseOut={() => setHoverState(false)}
        onMouseOver={() => setToggle(1)}
      >
        <Link to={images[1].link}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <h1
              style={{
                position: "absolute",
                maxWidth: 200,
                left: 5,
                bottom: 0,
                zIndex: 10,
                marginLeft: "2rem",
                marginBottom: "2rem",
                color: "white",
                fontWeight: 700,
                lineHeight: 1,
                transition: timingfunction,
                textShadow: "0 0 20px black",
                opacity: heroState === 1 ? 1 : 0,
                transform:
                  heroState === 1 ? "translateX(0px)" : "translateX(-370px)",
              }}
            >
              {images[1].title}
            </h1>
            <div
              style={{
                height: heroState === 1 ? "70%" : "60%",
                maxHeight: heroState === 1 ? "700px" : "800px",
                transition: timingfunction,
                position: "relative",
                marginTop: heroState === 1 ? "0%" : "5%",
              }}
            >
              <PreviewCompatibleImage
                style={{
                  height: "100%",
                }}
                imageInfo={{
                  image: images[1].image,
                  alt: images[1].title,
                  style: {
                    borderRadius: "0px",
                    maxWidth: "none",
                    height: "100%",
                  },
                }}
              />
            </div>
          </div>
        </Link>
      </div> */}
    </>
  );
};
