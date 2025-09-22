import Chart from "../components/chart";
import LogCard from "../components/LogCard";
import RecommendationCard from "../components/RecommendationCard";
import Header from "../components/Header";

function Dashboard() {
  return (
    <>
      {/* <p id="message"></p> */}
      <Header />
      <h1>Health Tracker</h1>
      <div className="grid grid-rows-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <LogCard />
          <RecommendationCard />
        </div>
        <div className="long-card">
          <h2 className="left-align">Weekly progress</h2>
          <p id="total"></p>
          <p id="average"></p>
          <Chart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
