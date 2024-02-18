import { AdButton } from 'component/AdSlide/AdButton';
import { AdImages } from './AdImage';
import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const StyledSliderContainer = styled.div`
  position: relative;
  margin-top: 6.25rem;
  width: 100%;
  height: 25rem;
`;

const StyledImg = styled.img<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 3s linear; // opacity에 대한 트랜지션 효과
  opacity: ${(props) =>
    props.visible ? 1 : 0}; // visible prop에 따라 투명도 조절
`;

const StyledControlsContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
const PickerWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%, -10px);
  display: flex;
`;
const Picker = styled.div<{ background: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.background};
  margin: 0 6px;
  cursor: pointer;
`;

export const AdSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pickers, setPickers] = useState<JSX.Element[]>([]);
  const totalImages = AdImages.length;
  const totalImage = AdImages;

  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(totalImages - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const onPickIndex = useCallback(
    (idx: number): void => {
      if (currentImageIndex === idx) {
        // 선택되어 있는 인덱스를 클릭시에는 아무것도 실행하지 않는다.
        return;
      }

      setCurrentImageIndex(idx);
    },
    [currentImageIndex],
  );

  useEffect(() => {
    // 이미지의 갯수만큼 pickers JSX.Element[] 배열 state에 생성하여 넣어준다.
    const newPickers = totalImage.map((_, idx: number) => (
      <Picker
        key={idx}
        onClick={() => onPickIndex(idx)}
        background={currentImageIndex === idx ? 'orange' : 'white'}
      ></Picker>
    ));

    setPickers(newPickers);
  }, [onPickIndex, currentImageIndex, totalImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      //3초마다 자동으로 다음 이미지 출력
      handleNextClick();
    }, 3000);
    return () => clearInterval(interval);
  }, [handleNextClick]);

  return (
    <StyledSliderContainer>
      <StyledImg
        src={AdImages[currentImageIndex]}
        alt={`Ad Image ${currentImageIndex}`}
        visible={true} // 현재 이미지는 표시
      />
      <StyledControlsContainer>
        <AdButton isLeft={true} onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </AdButton>
        <AdButton isLeft={false} onClick={handleNextClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </AdButton>
        <PickerWrapper>{pickers}</PickerWrapper>
      </StyledControlsContainer>
    </StyledSliderContainer>
  );
};
