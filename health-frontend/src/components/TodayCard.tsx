import { useEffect, useState } from "react";
import "../mystyle.scss";
import { getLog } from "../api/log";

function TodayCard() {
  const [logData, setLogData] = useState({});
  const [isThereTodayData, setIsThereTodayDate] = useState(true);
  const handleGetTodayLog = async () => {
    console.log("SUBMITTING LOG....");
    const today = new Date().toISOString().split("T")[0];
    try {
      const response = await getLog(today);
      console.log("RESPONSE OF GETTING TODAY LOG:", response);
      setLogData({ steps: response.steps });
    } catch (error) {
      //   alert("Failed to log data...: ");
      setIsThereTodayDate(false);
    }
  };

  useEffect(() => {
    console.log("GET LOG...");
    handleGetTodayLog();
  }, []);

  return (
    <>
      <div className="card">
        {isThereTodayData ? (
          <>
            <h2>Great job logging today!</h2>
            <p>Today, you walked {logData?.steps || 0} steps</p>
          </>
        ) : (
          <>
            <h2>Get off your lazy bum!</h2>
            <p>Track your data.</p>
          </>
        )}
      </div>
    </>
  );
}

export default TodayCard;
