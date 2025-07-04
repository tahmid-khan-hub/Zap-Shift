import UseAxiosSecure from "./UseAxiosSecure";

const useTrackingLogger = () => {
  const axiosSecure = UseAxiosSecure();

  return async (trackingEvent) => {
    try {
      const response = await axiosSecure.post("/trackings", trackingEvent);
      console.log("Tracking log success:", response.data);
    } catch (err) {
      console.error("Tracking log failed:", err);
    }
  };
};

export default useTrackingLogger;
