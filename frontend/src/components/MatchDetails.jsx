import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

import Commentary from "@/components/Commentary";
import PredictionCard from "@/components/PredictionCard";
import { apiService } from "@/utils/apiService";

const MatchDetails = ({
  match,
  commentary,
  bowlingStats,
  powerplays,
  fallOfWickets
}) =>  {
  const { team1, team2, venue, series, status, toss } = match;
  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);

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
  ] || [];

  const team2BattingScorecard = [
    { name: "Gurbaz (wk)", dismissal: "c Noor Ahmad b Anshul Kamboj", runs: 11, balls: 9, fours: 1, sixes: 1, strikeRate: 122.22 },
    { name: "Narine", dismissal: "st Dhoni b Noor Ahmad", runs: 26, balls: 17, fours: 4, sixes: 1, strikeRate: 152.94 },
    { name: "Ajinkya Rahane (c)", dismissal: "c Conway b Ravindra Jadeja", runs: 48, balls: 33, fours: 4, sixes: 2, strikeRate: 145.45 },
    { name: "Angkrish Raghuvanshi", dismissal: "c Dhoni b Noor Ahmad", runs: 1, balls: 2, fours: 0, sixes: 0, strikeRate: 50.0 },
    { name: "Manish Pandey", dismissal: "not out", runs: 36, balls: 28, fours: 1, sixes: 1, strikeRate: 128.57 },
    { name: "Russell", dismissal: "c Dewald Brevis b Noor Ahmad", runs: 38, balls: 21, fours: 4, sixes: 3, strikeRate: 180.95 },
    { name: "Rinku Singh", dismissal: "c Ayush Mhatre b Noor Ahmad", runs: 9, balls: 6, fours: 2, sixes: 0, strikeRate: 150.0 },
    { name: "Ramandeep Singh", dismissal: "not out", runs: 4, balls: 4, fours: 0, sixes: 0, strikeRate: 100.0 },
  ] || [];
  const didNotBatTeam1 = ["Khaleel Ahmed", "Matheesha Pathirana"];
  const didNotBatTeam2 = ["Moeen", "Vaibhav Arora", "Varun Chakaravarthy", "Harshit Rana"];
  console.log(bowlingStats);

  useEffect(() => {
    const getPrediction = async () => {
      try {
        setPredictionLoading(true);

        const parseNum = (val) => Number(val) || 0;

        const features1 = {
          batting_team: team1.name,
          bowling_team: team2.name,
          city: venue.split(",")[0],
          current_runs: parseNum(team1.runs),
          overs: parseNum(team1.overs),
          wickets: parseNum(team1.wickets),
          last_five: parseNum(team1.overs) > 0
            ? (parseNum(team1.runs) / parseNum(team1.overs)) * 5
            : 0
        };

        const features2 = {
          batting_team: team2.name,
          bowling_team: team1.name,
          city: venue.split(",")[0],
          current_runs: parseNum(team2.runs),
          overs: parseNum(team2.overs),
          wickets: parseNum(team2.wickets),
          last_five: parseNum(team2.overs) > 0
            ? (parseNum(team2.runs) / parseNum(team2.overs)) * 5
            : 0
        };

        let predictedScoreteam1Raw = null;
        let predictedScoreteam2Raw = null;

        if (Object.values(features1).every(v => v !== 0)) {
          predictedScoreteam1Raw = await apiService.predictScore(features1);
        }

        if (Object.values(features2).every(v => v !== 0)) {
          predictedScoreteam2Raw = await apiService.predictScore(features2);
        }

        setPrediction({
          team1: {
            name: team1.name,
            shortName: team1.shortName,
            winProbability: 5, // You may calculate this dynamically
            predictedScore: predictedScoreteam1Raw
              ? `${predictedScoreteam1Raw} (20.0)`
              : "Yet to Bat"
          },
          team2: {
            name: team2.name,
            shortName: team2.shortName,
            winProbability: 95,
            predictedScore: predictedScoreteam2Raw
              ? `${predictedScoreteam2Raw} (20.0)`
              : "Yet to Bat"
          },
          predictedWinner:
            predictedScoreteam1Raw > predictedScoreteam2Raw
              ? team1.name
              : team2.name
        });
      } catch (error) {
        console.error("Error getting prediction:", error);
      } finally {
        setPredictionLoading(false);
      }
    };
    getPrediction();
    // if (match && status === "live") {
    //   getPrediction();
    // }
  }, [match, status, team1.name, team2.name, venue, team1.runs, team1.overs, team1.wickets, team2.runs, team2.wickets, team2.overs]);

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


          <div className="flex justify-center items-center my-8">
            {/* Team 1 */}
            <div className="text-center mx-6 md:mx-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-cricket-gray rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg md:text-xl font-bold">{team1.shortName}</span>
              </div>
              <p className="mt-2 text-sm md:text-base font-medium">{team1.name}</p>
              <div className="mt-1">
                <span className="score text-xl md:text-2xl font-bold">{`${team1.runs}/${team1.wickets}`}</span>
                <span className="text-xs text-gray-500 block">{`(${team1.overs})`}</span>
              </div>
            </div>

            {/* VS Badge */}
            <div className="text-center mx-4">
              <span className="text-xl font-medium text-gray-400">vs</span>
            </div>

            {/* Team 2 */}
            <div className="text-center mx-6 md:mx-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-cricket-gray rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg md:text-xl font-bold">{team2.shortName}</span>
              </div>
              <p className="mt-2 text-sm md:text-base font-medium">{team2.name}</p>
              <div className="mt-1">
                <span className="score text-xl md:text-2xl font-bold">{`${team2.runs}/${team2.wickets}`}</span>
                <span className="text-xs text-gray-500 block">{`(${team2.overs})`}</span>
              </div>
            </div>
          </div>

          {match.result && (
            <div className="mt-4 p-3 text-sm border-t border-gray-100 text-center text-red-700">
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
              {commentary ? (
                <Commentary commentary={commentary} />
              ) : (
                <p className="text-sm text-gray-500">Loading commentary...</p>
              )}
            </TabsContent>

            <TabsContent value="scorecard">
              <Card className="cricket-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{match.status === "completed" ? "Scorecard" : "Live Scorecard"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Team 2 (KKR) Batting */}
                  <div className="mb-6">
                    <h3 className="text-md font-bold mb-2 text-blue-600">
                      {team2.name} Innings
                      <span className="ml-2 text-sm font-normal text-gray-600">
                        {`${team2.runs}-${team2.wickets} (${team2.overs} Ov)`}
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
                          {team2BattingScorecard.map((batter, index) => (
                            <TableRow key={`team2-${index}`}>
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
                            <TableCell colSpan={5} className="text-sm">
                              6 (b 0, lb 4, w 2, nb 0, p 0)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={1}>
                              <div className="font-medium">Total</div>
                            </TableCell>
                            <TableCell colSpan={5} className="text-sm font-medium">
                              179 (6 wkts, 20 Ov)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Did not bat section */}
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Did not Bat: </span>
                      {didNotBatTeam2.map((player, idx) => (
                        <React.Fragment key={idx}>
                          <span className="text-blue-500 hover:underline cursor-pointer">{player}</span>
                          {idx < didNotBatTeam2.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Fall of wickets section */}
                    {fallOfWickets && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium">Fall of Wickets: </span>
                        {fallOfWickets.team2.map((wicket, idx) => (
                          <React.Fragment key={idx}>
                            <span>{wicket.wicket} ({wicket.player}, {wicket.over})</span>
                            {idx < fallOfWickets.team2.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Team 1 (CSK) Bowling */}
                    <div className="mt-6">
                      <h4 className="text-sm font-bold mb-2">Bowling</h4>
                      <div className="overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[180px]">Bowler</TableHead>
                              <TableHead>O</TableHead>
                              <TableHead>M</TableHead>
                              <TableHead>R</TableHead>
                              <TableHead>W</TableHead>
                              <TableHead>NB</TableHead>
                              <TableHead>WD</TableHead>
                              <TableHead>ECO</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bowlingStats && bowlingStats.team2.map((bowler, index) => (
                              <TableRow key={`team1-bowling-${index}`}>
                                <TableCell>
                                  <div className="font-medium text-blue-500 hover:underline cursor-pointer">
                                    {bowler.name}
                                  </div>
                                </TableCell>
                                <TableCell>{bowler.overs}</TableCell>
                                <TableCell>{bowler.maidens}</TableCell>
                                <TableCell>{bowler.runs}</TableCell>
                                <TableCell className="font-medium">{bowler.wickets}</TableCell>
                                <TableCell>{bowler.noBalls}</TableCell>
                                <TableCell>{bowler.wides}</TableCell>
                                <TableCell>{bowler.economy.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Powerplays section */}
                    {powerplays && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold mb-2">Powerplays</h4>
                        <div className="overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Overs</TableHead>
                                <TableHead>Runs</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Mandatory</TableCell>
                                <TableCell>{powerplays.team2.mandatory.overs}</TableCell>
                                <TableCell>{powerplays.team2.mandatory.runs}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Team 1 (CSK) Batting */}
                  <div>
                    <h3 className="text-md font-bold mb-2 text-blue-600">
                      {team1.name} Innings
                      <span className="ml-2 text-sm font-normal text-gray-600">
                        {`${team1.runs}-${team1.wickets} (${team1.overs} Ov)`}
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
                          {team1BattingScorecard.map((batter, index) => (
                            <TableRow key={`team1-${index}`}>
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
                            <TableCell colSpan={5} className="text-sm">
                              5 (b 0, lb 1, w 4, nb 0, p 0)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={1}>
                              <div className="font-medium">Total</div>
                            </TableCell>
                            <TableCell colSpan={5} className="text-sm font-medium">
                              183 (8 wkts, 19.4 Ov)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Did not bat section */}
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Did not Bat: </span>
                      {didNotBatTeam1.map((player, idx) => (
                        <React.Fragment key={idx}>
                          <span className="text-blue-500 hover:underline cursor-pointer">{player}</span>
                          {idx < didNotBatTeam1.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Fall of wickets section */}
                    {fallOfWickets && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium">Fall of Wickets: </span>
                        {fallOfWickets.team1.map((wicket, idx) => (
                          <React.Fragment key={idx}>
                            <span>{wicket.wicket} ({wicket.player}, {wicket.over})</span>
                            {idx < fallOfWickets.team1.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Team 2 (KKR) Bowling */}
                    <div className="mt-6">
                      <h4 className="text-sm font-bold mb-2">Bowling</h4>
                      <div className="overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[180px]">Bowler</TableHead>
                              <TableHead>O</TableHead>
                              <TableHead>M</TableHead>
                              <TableHead>R</TableHead>
                              <TableHead>W</TableHead>
                              <TableHead>NB</TableHead>
                              <TableHead>WD</TableHead>
                              <TableHead>ECO</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bowlingStats && bowlingStats.team1.map((bowler, index) => (
                              <TableRow key={`team2-bowling-${index}`}>
                                <TableCell>
                                  <div className="font-medium text-blue-500 hover:underline cursor-pointer">
                                    {bowler.name}
                                  </div>
                                </TableCell>
                                <TableCell>{bowler.overs}</TableCell>
                                <TableCell>{bowler.maidens}</TableCell>
                                <TableCell>{bowler.runs}</TableCell>
                                <TableCell className="font-medium">{bowler.wickets}</TableCell>
                                <TableCell>{bowler.noBalls}</TableCell>
                                <TableCell>{bowler.wides}</TableCell>
                                <TableCell>{bowler.economy.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Powerplays section */}
                    {powerplays && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold mb-2">Powerplays</h4>
                        <div className="overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Overs</TableHead>
                                <TableHead>Runs</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Mandatory</TableCell>
                                <TableCell>{powerplays.team1.mandatory.overs}</TableCell>
                                <TableCell>{powerplays.team1.mandatory.runs}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
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
                      <p className="text-sm text-muted-foreground">{toss}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {(
            predictionLoading ? (
              <Card className="cricket-card">
                <CardHeader>
                  <CardTitle className="text-lg">Match Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Calculating prediction...</p>
                </CardContent>
              </Card>
            ) : prediction ? (
              <PredictionCard {...prediction} />
            ) : (
              <Card className="cricket-card">
                <CardHeader>
                  <CardTitle className="text-lg">Match Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Unable to generate prediction at this time
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
