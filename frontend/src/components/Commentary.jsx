import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Commentary = ({ commentary }) => {
  // ✅ Extract commentary array safely
  const commentaryItems =
    Array.isArray(commentary) && commentary.length > 0 && Array.isArray(commentary[0].commentary)
      ? commentary[0].commentary
      : [];

  const formatOver = (ballNumber) => {
    const over = Math.floor(ballNumber);
    const ball = Math.round((ballNumber - over) * 10);
    return `${over}.${ball}`;
  };

  const isWicket = (ball) => ball?.wicket?.is_wicket;
  const isBoundary = (ball) => ball?.runs_scored === 4 || ball?.runs_scored === 6;
  const isSix = (ball) => ball?.runs_scored === 6;

  const groupCommentaryByOvers = () => {
    const groups = {};
    commentaryItems.forEach((item) => {
      if (!item?.ball_data || typeof item.ball_data.ball_number !== "number") return;
      const over = Math.floor(item.ball_data.ball_number);
      if (!groups[over]) {
        groups[over] = [];
      }
      groups[over].push(item);
    });
    return groups;
  };

  const commentaryByOvers = groupCommentaryByOvers();

  return (
    <Card className="cricket-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ball-by-Ball Commentary</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {Object.entries(commentaryByOvers)
              .sort((a, b) => Number(b[0]) - Number(a[0])) // Sorting overs in reverse order
              .map(([over, items]) => (
                <div key={`over-${over}`} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <h3 className="text-sm font-bold bg-gray-100 px-3 py-2 rounded-md mb-3">
                    {`Over ${over}`}
                  </h3>
                  <div className="space-y-4">
                    {/* Sort items by ball_number in descending order */}
                    {[...items]
                      .sort((a, b) => b.ball_data.ball_number - a.ball_data.ball_number)
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-md ${
                            isWicket(item.ball_data)
                              ? "bg-cricket-red/10 border-l-2 border-cricket-red"
                              : isSix(item.ball_data)
                              ? "bg-cricket-gold/10 border-l-2 border-cricket-gold"
                              : isBoundary(item.ball_data)
                              ? "bg-cricket-green/10 border-l-2 border-cricket-green"
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex justify-between">
                            <span className="text-xs font-bold bg-gray-200 px-2 py-0.5 rounded-full">
                              {formatOver(item.ball_data.ball_number)}
                            </span>
                            <span className="text-xs text-gray-500">{item.timestamp}</span>
                          </div>
                          <div className="mt-2 flex items-center">
                            <span className="text-xs font-medium text-gray-700 mr-2">
                              {item.ball_data.bowler} to {item.ball_data.batsman}
                            </span>
                            {item.ball_data?.extras?.wides > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded">Wide</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm">{item.text}</p>
                          {item.ball_data.runs_scored > 0 && !isWicket(item.ball_data) && (
                            <div className="mt-2">
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  isBoundary(item.ball_data)
                                    ? item.ball_data.runs_scored === 4
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-cricket-gold/20 text-yellow-700"
                                    : "bg-gray-200"
                                }`}
                              >
                                {item.ball_data.runs_scored}{" "}
                                {item.ball_data.runs_scored === 1 ? "Run" : "Runs"}
                              </span>
                            </div>
                          )}
                          {isWicket(item.ball_data) && (
                            <div className="mt-2 text-xs font-bold text-cricket-red">
                              WICKET!{" "}
                              {item.ball_data.wicket.dismissal_type &&
                                `(${item.ball_data.wicket.dismissal_type})`}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Commentary;
