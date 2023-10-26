import {
  faMapPin,
  faPause,
  faPlay,
  faRightLong,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';
import tw from 'twin.macro';

type ActionsBtnsProps = {
  onReplay?: (e: any) => void;
  onPlay?: (e: any) => void;
  onPause?: (e: any) => void;
  onGoToReFrain?: (e: any) => void;
  onNext?: (e: any) => void;
};

const ActionButtonsContainer = styled.div`
  ${tw`
    flex
    gap-2
  `}
`;

const ActionButton = styled.button`
  ${tw`
    px-4
    py-1
    text-sm
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

const ActionButtons = (props: ActionsBtnsProps) => (
  <ActionButtonsContainer>
    <ActionButton onClick={props.onReplay}>
      <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faRotateRight} />
      Replay
    </ActionButton>
    <ActionButton onClick={props.onPlay}>
      <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faPlay} />
      Play
    </ActionButton>
    <ActionButton onClick={props.onPause}>
      <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faPause} />
      Pause
    </ActionButton>
    <ActionButton onClick={props.onGoToReFrain}>
      <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faMapPin} />
      Go to Chorus
    </ActionButton>
    <ActionButton onClick={props.onNext}>
      <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faRightLong} />
      Next
    </ActionButton>
  </ActionButtonsContainer>
);

export default ActionButtons;
