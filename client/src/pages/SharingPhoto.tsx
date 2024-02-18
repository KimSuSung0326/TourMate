import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReviewModal } from 'feature/Modal/ReviewModal';
declare global {
  interface Window {
    kakao: any;
  }
}
const StyledMapWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 0 2rem;
  width: 50rem;
  height: 40rem;
  margin: auto;
  border: 1px solid black;
`;
const StyledTitle = styled.h1`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
const StyledUploadBtn = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
  margin-left: 65%;
  font-size: 1.2rem;
  font-weight: 650;
  background-color: var(--blue-100);
  color: var(--white);
  border-radius: 0.3rem;
  width: 7rem;
  &:hover {
    cursor: pointer;
  }
`;
export const SharingPhoto = () => {
  const [map, setMap] = useState(null); // 지도 상태
  const [isopen, setIsOpen] = useState(false); // 모달 상태
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
  });

  return (
    <>
      <StyledTitle> 공유된 여행 사진</StyledTitle>
      <StyledMapWrap>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </StyledMapWrap>
    </>
  );
};
