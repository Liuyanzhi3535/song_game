import styled from 'styled-components';
import tw from 'twin.macro';
import ActionButtons from '../actions';
import { useState } from 'react';
import sortSongArray from '../../utils/random-songs';
import YTPlayer from '../../components/yt-player';

const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
  `}
`;

const MainButton = styled.button`
  ${tw`
    px-8
    py-4
    text-4xl
    bg-blue-700
    text-gray-200
    font-semibold
    rounded-full
    border
    border-blue-600
    hover:text-white
    hover:bg-blue-600
    hover:border-transparent
    focus:outline-none
    focus:ring-2
    focus:ring-blue-600
    focus:ring-offset-2
  `}
`;

const SongInfo = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    m-2
    py-5
    w-[960px]
    h-[600px]
    overflow-y-scroll
    bg-gray-700
    rounded-xl
  `}
  & h1 {
    ${tw`
      font-semibold
      text-3xl
      text-gray-200
      m-2
    `}
  }
  & p {
    ${tw`
      text-sm
      text-blue-200
      font-bold
    `}
  }
`;

const ActionButton = styled.button`
  ${tw`
    px-4
    py-1
    text-sm
    bg-orange-700
    text-gray-200
    font-semibold
    rounded-full
    border
    border-orange-600
    hover:text-white
    hover:bg-orange-600
    hover:border-transparent
    focus:outline-none
    focus:ring-2
    focus:ring-orange-600
    focus:ring-offset-2
  `}
`;

const HomePage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [forceUpdateAt, setForceUpdateAt] = useState(Date.now());
  const [play, setPlay] = useState(() => () => {});
  const [pause, setPause] = useState(() => () => {});
  const [seekTo, setSeekTo] = useState(() => (sec: number) => {
    console.log(sec);
  });
  const [isShowAnswer, setIsShow] = useState(false);

  return (
    <PageContainer>
      {/* 開始遊戲 */}
      {!isStarted && (
        <MainButton onClick={() => setIsStarted(true)}>Start</MainButton>
      )}
      {/* 遊戲中 */}
      {isStarted && sortSongArray[songIndex] && (
        <>
          {' '}
          <SongInfo>
            <ActionButton onClick={() => setIsShow(!isShowAnswer)}>
              lyrics
            </ActionButton>
            {isShowAnswer ? (
              <>
                <h1>{sortSongArray[songIndex]['name']!}</h1>
                <p>{sortSongArray[songIndex]['artist']!}</p>
                {sortSongArray[songIndex]['lyrics']!.map((sentence) => (
                  <div className="text-3xl my-1 text-white font-blod">
                    {sentence}
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </SongInfo>
          <YTPlayer
            forceUpdateAt={forceUpdateAt}
            name={sortSongArray[songIndex]['name']!}
            urlPath={sortSongArray[songIndex]['urlPath']!}
            setPlay={setPlay}
            setPause={setPause}
            setSeekTo={setSeekTo}
          ></YTPlayer>
          <ActionButtons
            onReplay={() => setForceUpdateAt(Date.now())}
            onPlay={() => play()}
            onPause={() => pause()}
            onGoToReFrain={() => seekTo(sortSongArray[songIndex]['refrain']!)}
            onNext={() => {
              setSongIndex(songIndex + 1);
              setIsShow(false);
            }}
          ></ActionButtons>
        </>
      )}
      {/* 再玩一次 */}
      {isStarted && !sortSongArray[songIndex] && (
        <MainButton onClick={() => setSongIndex(0)}>Play Again</MainButton>
      )}
    </PageContainer>
  );
};

export default HomePage;
