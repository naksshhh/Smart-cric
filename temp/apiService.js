import { mockData, getMatchDetails } from "./mockData";
import { mockCommentary } from "./mockCommentary";

// This is a mock API service that simulates fetching data from an API
export const apiService = {
  getLiveMatches: async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.liveMatches;
  },
  
  getPastMatches: async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.pastMatches;
  },
  
  getMatchDetails: async (id) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 700));
    
    // For past matches, use the detailed commentary
    if (id.startsWith("past")) {
      return {
        match: getMatchDetails(id).match,
        commentary: mockCommentary
      };
    }
    
    // For live matches, use the regular commentary
    return getMatchDetails(id);
  }
};
