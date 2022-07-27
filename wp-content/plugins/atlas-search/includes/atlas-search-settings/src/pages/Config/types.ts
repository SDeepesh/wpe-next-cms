export interface Configs {
  fuzzy: {
    enabled: boolean;
    distance: number;
  };

  models: {
    [model: string]: Fields;
  };
}

export interface Fields {
  [fieldName: string]: Config;
}

export interface Config {
  searchable: boolean;
  weight: number;
}
