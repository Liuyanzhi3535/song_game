import { Dispatch, SetStateAction, useEffect } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

type PlayerProps = {
  name: string;
  urlPath: string;
  forceUpdateAt: number;
  setPlay?: Dispatch<SetStateAction<() => void>>;
  setPause?: Dispatch<SetStateAction<() => void>>;
  setSeekTo?: Dispatch<SetStateAction<(sec: number) => void>>;
};

const PlayerContainer = styled.div`
  ${tw`
    flex
    justify-end
    items-end
    w-[960px]
    h-[50px]
    bg-gray-100
    overflow-y-hidden
    my-4
    blur-sm
  `}
`;

function YTPlayer(props: PlayerProps) {
  const { urlPath, forceUpdateAt, setPlay, setPause, setSeekTo } = props;
  const onPlayerReady = (v: any) => {
    const player = v.target;
    setPlay &&
      setPlay!(() => () => {
        player.playVideo();
      });
    setPause &&
      setPause(() => () => {
        player.pauseVideo();
      });
    setSeekTo &&
      setSeekTo(() => (sec: number) => {
        player.seekTo(sec);
      });
  };

  useEffect(() => {
    loadYTApi();
  }, []);

  const loadYTApi = async () => {
    // @ts-ignore
    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';
      // @ts-ignore
      window.onYouTubeIframeAPIReady = loadVideo; // onYouTubeIframeAPIReady will load the video after the script is loaded
      const firstScriptTag = document.getElementsByTagName('script')[0];
      // @ts-ignore
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If script is already there, load the video directly
      loadVideo();
    }
  };
  const loadVideo = () => {
    // the Player object is created uniquely based on the id in props
    // @ts-ignore
    new YT.Player('ytvedio', {
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  return (
    <PlayerContainer>
      <iframe
        id="ytvedio"
        title="songsVideo"
        width="100%"
        height="auto"
        src={`${urlPath}&enablejsapi=1&html5=1&forceUpdateAt=${forceUpdateAt}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </PlayerContainer>
  );
}

export default YTPlayer;
