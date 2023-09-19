import { SongInfo, SongInfoMap } from './song-info.js';
import { songs } from './song.js';

const sortSongArray = shuffle(convetToArray(songs));

function convetToArray(songs: SongInfoMap) {
  const result: SongInfo[] = Object.entries(songs).map(
    ([key, { id, startSec, artist, refrain }]) => {
      return {
        name: key,
        startSec,
        id,
        artist,
        refrain,
        urlPath: `https://www.youtube.com/embed/${id}?start=${startSec}`,
      };
    }
  );
  return result;
}

function shuffle(array: SongInfo[]) {
  let tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array;
}
export default sortSongArray;
