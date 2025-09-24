import Chart from "../components/chart";
import LogCard from "../components/LogCard";
import RecommendationCard from "../components/RecommendationCard";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";

function Dashboard() {
  return (
    <>
      {/* <p id="message"></p> */}
      <Header />
      <div className="flex flex-col gap-4">
        <h1>Health Tracker</h1>
        <div className="grid grid-flow-col gap-4">
          <div className="col-span-2 flex-1">
            <TodayCard />
          </div>
          <div className="col-span-2 row-span-2">
            <LogCard />
          </div>
          <div className="col-span-2 row-span-3">
            <RecommendationCard />
          </div>
        </div>
        <div className="card">
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

// <div className="grid grid-rows-2 gap-4">
//         <div className="grid grid-cols-2 gap-4">
//           <TodayCard />
//           <LogCard />
//           <RecommendationCard />
//         </div>
//         <div className="long-card">
//           <h2 className="left-align">Weekly progress</h2>
//           <p id="total"></p>
//           <p id="average"></p>
//           <Chart />
//         </div>
//       </div>
