export const aiPredictionService = {
  getPrediction: (matchId) => {
    return {
      team1: {name: "Chennai Super Kings",shortName: "CSK",winProbability: 65,predictedScore: "192/6 (20)",},
      team2: {name: "Kolkata Knight Riders",shortName: "KKR",winProbability: 35,predictedScore: "176/9 (20)",},
      predictedWinner: "Chennai Super Kings",
    };
  },
};
