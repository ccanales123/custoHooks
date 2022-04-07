import { useEffect, useState, useRef } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({
      loading: true,
      error: null,
      data: null,
    });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {
          if (isMounted.current) {
            setState({
              loading: false,
              error: null,
              data: data,
            });
          } else {
            console.log("Set state no se llamo")
          }

        }, 500);
      });
  }, [url]);

  return state;
};
