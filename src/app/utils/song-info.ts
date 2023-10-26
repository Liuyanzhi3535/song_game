export type SongInfo = {
  id: string;
  startSec: number;
  refrain: number;
  name?: string;
  artist?: string;
  urlPath?: string;
  lyrics?: string[];
};

export type SongInfoMap = {
  [key: string]: SongInfo;
};
