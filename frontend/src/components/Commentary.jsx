import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Commentary = ({ commentary }) => {
  // First, ensure commentary is an array (defensive programming)
  const safeCommentary = Array.isArray(commentary) ? commentary : [];

  const formatOver = (ballNumber) => {
    // Handle ball number format from backend (4.2, 15.6, etc.)
    if (typeof ballNumber === 'string' || typeof ballNumber === 'number') {
      return String(ballNumber);
    }
    return "0.0";
  };

  const isWicket = (ball_data) => {
    // Safely check if wicket exists and is_wicket is true
    // console.log("wicket data:", ball_data?.wicket?.is_wicket);
    return ball_data?.wicket?.is_wicket===true;
  };

  const isBoundary = (ball_data) => {
    // Safely check for boundaries
    return ball_data?.runs_scored === 4 || ball_data?.runs_scored === 6;
  };

  const getRunClassName = (ball_data) => {
    if (!ball_data) return "text-xs font-bold px-2 py-0.5 rounded-full bg-gray-200";
    
    if (isBoundary(ball_data)) {
      return ball_data.runs_scored === 4
        ? "text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
        : "text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700";
    }
    return "text-xs font-bold px-2 py-0.5 rounded-full bg-gray-200";
  };

  // Check if commentary is available
  if (!safeCommentary.length) {
    return (
      <Card className="cricket-card h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Live Commentary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[400px]">
            <p className="text-gray-500">No commentary available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cricket-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Live Commentary</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {safeCommentary.map((item, index) => {
              // Skip rendering items without ball_data
              if (!item || !item.ball_data) {
                return (
                  <div key={index} className="p-3 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-500">Commentary data incomplete</p>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`p-3 rounded-md ${
                    isWicket(item.ball_data)
                      ? "bg-cricket-red/10 border-l-2 border-cricket-red"
                      : isBoundary(item.ball_data)
                      ? "bg-cricket-green/10 border-l-2 border-cricket-green"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-gray-200 px-2 py-0.5 rounded-full">
                        {formatOver(item.ball_data.ball_number)}
                      </span>
                      <span className="text-xs font-medium">
                        {item.ball_data.bowler || "Bowler"} to {item.ball_data.batsman || "Batsman"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{item.timestamp || ""}</span>
                  </div>
                  
                  <p className="mt-2 text-sm">{item.commentary || item.text || "No commentary"}</p>
                  
                  {item.ball_data.runs_scored > 0 && !isWicket(item.ball_data) && (
                    <div className="mt-2">
                      <span className={getRunClassName(item.ball_data)}>
                        {item.ball_data.runs_scored === 4 ? "FOUR" : 
                         item.ball_data.runs_scored === 6 ? "SIX" : 
                         `${item.ball_data.runs_scored} ${item.ball_data.runs_scored === 1 ? "Run" : "Runs"}`}
                      </span>
                    </div>
                  )}
                  
                  {isWicket(item.ball_data) && (
                    <div className="mt-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        WICKET
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Commentary;
