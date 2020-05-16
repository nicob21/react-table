import React from "react";

const LazyLoadContainer = (props) => {
  const delay = 200;
  let timeoutSet = false;

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      if (!timeoutSet) {
        timeoutSet = true;
        setTimeout(() => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
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

export default LazyLoadContainer;
