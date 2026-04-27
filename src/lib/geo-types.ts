export interface EngineMap<V> { [engine: string]: V }

export interface TimeseriesPoint {
  run_id: string;
  share_of_model: number;
  by_engine: EngineMap<number>;
}

export interface IndexFile {
  last_updated: string;
  summary: {
    share_of_model: number;
    share_of_model_by_engine: EngineMap<number>;
  };
  timeseries: TimeseriesPoint[];
  queries: {
    [id: string]: {
      category: "identity" | "attribution";
      history: { run_id: string; engines_mentioning: string[] }[];
    };
  };
  citations: { [url: string]: { count: number; is_owned: boolean } };
}
