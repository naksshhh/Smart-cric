import { mockData, getMatchDetails } from "@/utils/mockData";
import axios from 'axios';

// const dotenv=require('dotenv');
// dotenv.config();

const API_BASE_URL='http://localhost:8000/';
// This is a mock API service that simulates fetching data from an API
export const apiService = {
  getLiveMatches: async () => {
    // Simulate API call delay
    const response= await axios.get(`${API_BASE_URL}/api/fetch-live-score`);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    return response.data;
    // return mockData.liveMatches;
  },

  generateCommentary:async(ballData,additionalContext)=>{
    // Simulate API call delay
    const response= await axios.post(`${API_BASE_URL}/api/commentary/`,{
      ...ballData,
      additional_context: additionalContext
      });
      // await new Promise((resolve) => setTimeout(resolve, 500));
      return response.data;
  },

  getPastMatches: async () => {
    // Simulate API call delay
    try {
      const response = await axios.get(`${API_BASE_URL}/api/match-details/`);
      return response.data.pastMatches;
    } catch (error) {
      console.error("Error fetching match details:", error);
      return [];
    }
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // return mockData.pastMatches;
  },

  predictScore: async (features) => {
    const response = await axios.post(`${API_BASE_URL}/api/predict-score/`, features);
    return response.data.predicted_score;
  },
 
  getMatchDetails: async (id) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 700));
    return getMatchDetails(id);
  }
};
