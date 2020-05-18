import React from "react";
import PropTypes from "prop-types";

/**
 * Listen to scroll event and run the loadMore function when the bottom
 * is almost reached and the scroll stopped for a delay
 */

const LazyLoadContainer = (props) => {
  const delay = 500;
  let timeoutSet = false;

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      if (!timeoutSet) {
        timeoutSet = true;
        setTimeout(() => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight * 0.95
          ) {
            props.loadMore();
          }
          timeoutSet = false;
        }, delay);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>{props.children}</>;
};

LazyLoadContainer.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default LazyLoadContainer;
