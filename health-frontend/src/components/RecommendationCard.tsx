import { useEffect, useState } from "react";
import { getRecommendation } from "../api/recommendation";

function RecommendationCard() {
  const [recommendations, setRecommendations] = useState<string>("");
  useEffect(() => {
    const cachedRecommendation = localStorage.getItem("recommendation");
    if (cachedRecommendation) {
      console.log("Loaded recommendation from localStorage");
      setRecommendations(cachedRecommendation);
    } else {
      console.log("create another recommendation...");
      getRecommendation()
        .then((response) => {
          console.log("response recs----:", response);
          const bullets = response
            .split("\n")
            .map((b) => b.trim())
            .filter((b) => b !== "");
          const recommendationText = bullets.join("<br><br>");
          setRecommendations(recommendationText);
          localStorage.setItem("recommendation", recommendationText);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, []);
  return (
    <div className="recommendation-card">
      <div className="content">
        <h2>Recommendations</h2>
        {!recommendations ? (
          <p id="recommendation">
            Short tips appear here — text sits above the canvas gradient.
          </p>
        ) : (
          <p
            id="recommendation"
            dangerouslySetInnerHTML={{ __html: recommendations }}
          />
        )}
      </div>
    </div>
  );
}

export default RecommendationCard;
