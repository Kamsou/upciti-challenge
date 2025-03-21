export interface AverageResponse {
  overallHourlyAverage: number;
  hourlyAverages: { [key: string]: number };
  hourlyAveragesByWeekday: { [key: string]: number };
  hourWithHighestAverage: TimeValue;
  hourWithLowestAverage: TimeValue;
}

export interface TimeValue {
  value: number;
  time: string;
}
