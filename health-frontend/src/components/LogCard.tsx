import { useState } from "react";
import "../mystyle.scss";
import MoodSlider from "./MoodSlider";
import { postLog } from "../api/log";

function LogCard() {
  const [logData, setLogData] = useState({
    steps: 0,
    mood: 3,
    sleep: 0,
    calories: 0,
    date: "",
  });
  const handleLogChange = (e) => {
    const { name, value } = e.target;
    console.log("filed:", name, "value:", value);
    setLogData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitLog = async () => {
    console.log("SUBMITTING LOG....");
    try {
      const response = await postLog(logData);
      console.log("RESPONSE OF POSTING LOG:", response);
      // reset log data
      setLogData({ steps: 0, calories: 0, sleep: 0, mood: 0, date: "" });
    } catch (error) {
      alert("Failed to log data...: ");
    }
  };
  return (
    <>
      <div className="card">
        <form id="dataForm" onSubmit={handleSubmitLog}>
          <h2>Log your day</h2>
          <div className="row">
            <label htmlFor="date">Date</label>
            <input
              name="date"
              type="date"
              id="date"
              className="input-field"
              value={logData.date}
              onChange={handleLogChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="steps">Steps</label>
            <input
              name="steps"
              type="number"
              id="steps"
              className="input-field"
              placeholder="Steps"
              value={logData.steps}
              onChange={handleLogChange}
              min="0"
              step="1"
            />
          </div>
          <div className="row">
            <label htmlFor="calories">Calories</label>
            <input
              name="calories"
              type="number"
              id="calories"
              className="input-field"
              placeholder="Calories"
              value={logData.calories}
              onChange={handleLogChange}
              min="0"
              step="1"
            />
          </div>
          <div className="row">
            <label htmlFor="sleep">Sleep (hours)</label>
            <input
              name="sleep"
              type="number"
              id="sleep"
              className="input-field"
              placeholder="Sleep"
              value={logData.sleep}
              onChange={handleLogChange}
              min="0"
              max="24"
              step="0.5"
            />
          </div>
          <MoodSlider
            mood={logData.mood}
            onChange={(e) => handleLogChange(e)}
          />
          <div className="row bottom-row">
            <button id="cancelData" className="disabled">
              Cancel
            </button>
            <button id="logData" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogCard;
