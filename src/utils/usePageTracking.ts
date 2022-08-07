import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const usePageTracking = () => {
  const location = useLocation();
  const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;
