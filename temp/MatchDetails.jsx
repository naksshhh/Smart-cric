import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Commentary from "./Commentary";
import PredictionCard from "./PredictionCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MatchDetails = ({ match, commentary, prediction }) => {
  const { team1, team2, venue, series, status } = match;

  const team1BattingScorecard = [
    { name: "Ayush Mhatre", dismissal: "c Harshit Rana b Vaibhav Arora", runs: 0, balls: 2, fours: 0, sixes: 0, strikeRate: 0.0 },
    { name: "Devon Conway", dismissal: "b Moeen", runs: 0, balls: 2, fours: 0, sixes: 0, strikeRate: 0.0 },
    { name: "Urvil Patel", dismissal: "c Varun Chakaravarthy b Harshit Rana", runs: 31, balls: 11, fours: 1, sixes: 4, strikeRate: 281.82 },
    { name: "Ravichandran Ashwin", dismissal: "c Angkrish Raghuvanshi b Harshit Rana", runs: 8, balls: 7, fours: 1, sixes: 0, strikeRate: 114.29 },
    { name: "Ravindra Jadeja", dismissal: "b Varun Chakaravarthy", runs: 19, balls: 10, fours: 2, sixes: 1, strikeRate: 190.0 },
    { name: "Dewald Brevis", dismissal: "c Rinku Singh b Varun Chakaravarthy", runs: 52, balls: 25, fours: 4, sixes: 4, strikeRate: 208.0 },
    { name: "Shivam Dube", dismissal: "c Rinku Singh b Vaibhav Arora", runs: 45, balls: 40, fours: 2, sixes: 3, strikeRate: 112.5 },
    { name: "MS Dhoni (c & wk)", dismissal: "not out", runs: 17, balls: 18, fours: 0, sixes: 1, strikeRate: 94.44 },
    { name: "Noor Ahmad", dismissal: "c Rinku Singh b Vaibhav Arora", runs: 2, balls: 2, fours: 0, sixes: 0, strikeRate: 100.0 },
    { name: "Anshul Kamboj", dismissal: "not out", runs: 4, balls: 1, fours: 1, sixes: 0, strikeRate: 400.0 },
  ];

  const team2BattingScorecard = [
    { name: "Gurbaz (wk)", dismissal: "c Noor Ahmad b Anshul Kamboj", runs: 11, balls: 9, fours: 1, sixes: 1, strikeRate: 122.22 },
    { name: "Narine", dismissal: "st Dhoni b Noor Ahmad", runs: 26, balls: 17, fours: 4, sixes: 1, strikeRate: 152.94 },
    { name: "Ajinkya Rahane (c)", dismissal: "c Conway b Ravindra Jadeja", runs: 48, balls: 33, fours: 4, sixes: 2, strikeRate: 145.45 },
    { name: "Angkrish Raghuvanshi", dismissal: "c Dhoni b Noor Ahmad", runs: 1, balls: 2, fours: 0, sixes: 0, strikeRate: 50.0 },
    { name: "Manish Pandey", dismissal: "not out", runs: 36, balls: 28, fours: 1, sixes: 1, strikeRate: 128.57 },
    { name: "Russell", dismissal: "c Dewald Brevis b Noor Ahmad", runs: 38, balls: 21, fours: 4, sixes: 3, strikeRate: 180.95 },
    { name: "Rinku Singh", dismissal: "c Ayush Mhatre b Noor Ahmad", runs: 9, balls: 6, fours: 2, sixes: 0, strikeRate: 150.0 },
    { name: "Ramandeep Singh", dismissal: "not out", runs: 4, balls: 4, fours: 0, sixes: 0, strikeRate: 100.0 },
  ];

  return (
    <div className="space-y-6">
      <Card className="cricket-card">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">{series}</h2>
            <p className="text-xs text-gray-400 mt-1">{venue}</p>
            {status === "live" && (
              <div className="inline-block mt-2 px-2 py-1 bg-cricket-red/10 text-cricket-red text-xs font-medium rounded-full animate-pulse">
                LIVE
              </div>
            )}
          </div>

          <div className="flex justify-center items-center space-x-6 md:space-x-12 my-8">
            {[team1, team2].map((team, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-cricket-gray rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg md:text-xl font-bold">{team.shortName}</span>
                </div>
                <p className="mt-2 text-sm md:text-base font-medium">{team.name}</p>
                <div className="mt-1">
                  <span className="score text-xl md:text-2xl font-bold">{`${team.runs}/${team.wickets}`}</span>
                  <span className="text-xs text-gray-500 block">{`(${team.overs})`}</span>
                </div>
              </div>
            ))}
          </div>

          {match.result && (
            <div className="mt-4 p-3 text-sm border-t border-gray-100 text-center">
              <span className="font-medium">{match.result}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="commentary" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="commentary">Commentary</TabsTrigger>
              <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="commentary">
              <Commentary commentary={commentary} />
            </TabsContent>
            <TabsContent value="scorecard">
              <Card className="cricket-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{match.status === "completed" ? "Scorecard" : "Live Scorecard"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {[{ team: team1, scorecard: team1BattingScorecard, extras: "5 (b 0, lb 1, w 4, nb 0, p 0)" },
                    { team: team2, scorecard: team2BattingScorecard, extras: "6 (b 0, lb 4, w 2, nb 0, p 0)" }]
                    .map(({ team, scorecard, extras }, idx) => (
                    <div key={idx} className={idx === 0 ? "mb-6" : ""}>
                      <h3 className="text-md font-bold mb-2 text-blue-600">
                        {team.name} Innings
                        <span className="ml-2 text-sm font-normal text-gray-600">
                          {`${team.runs}-${team.wickets} (${team.overs} Ov)`}
                        </span>
                      </h3>
                      <div className="overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[220px]">Batter</TableHead>
                              <TableHead>R</TableHead>
                              <TableHead>B</TableHead>
                              <TableHead>4s</TableHead>
                              <TableHead>6s</TableHead>
                              <TableHead>SR</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {scorecard.map((batter, index) => (
                              <TableRow key={`${team.shortName}-${index}`}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium text-blue-500 hover:underline cursor-pointer">
                                      {batter.name}
                                    </div>
                                    <div className="text-xs text-gray-500">{batter.dismissal}</div>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{batter.runs}</TableCell>
                                <TableCell>{batter.balls}</TableCell>
                                <TableCell>{batter.fours}</TableCell>
                                <TableCell>{batter.sixes}</TableCell>
                                <TableCell>{batter.strikeRate.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={1}>
                                <div className="font-medium">Extras</div>
                              </TableCell>
                              <TableCell colSpan={5} className="text-sm">{extras}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="info">
              <Card className="cricket-card">
                <CardHeader>
                  <CardTitle className="text-lg">Match Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Venue</h3>
                      <p className="text-sm text-muted-foreground">{venue}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Series</h3>
                      <p className="text-sm text-muted-foreground">{series}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Toss</h3>
                      <p className="text-sm text-muted-foreground">{team1.name} won the toss and elected to bat first</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Umpires</h3>
                      <p className="text-sm text-muted-foreground">R Tucker, M Erasmus, C Gaffaney</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <PredictionCard
            team1={prediction.team1}
            team2={prediction.team2}
            predictedWinner={prediction.predictedWinner}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
