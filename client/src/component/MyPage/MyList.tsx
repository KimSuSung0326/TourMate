import React from 'react';
import { styled } from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
interface MyPageItemProps {
  item: {
    title: string;
    createdAt: string;
    userName: string;
    StartDate: string;
    EndDate: string;
  };
}

export const MyList: React.FC<MyPageItemProps> = ({ item }) => {
  const [Like, setLike] = useState(0);
  return (
    <>
      <DivContainer>
        <TitleContainer>{item.title}</TitleContainer>

        <SubContainer>
          <StyledUserName>{item.userName}</StyledUserName>
          <StyledDate> {'⏱️ ' + item.StartDate + `~`} </StyledDate>
          <StyledDate> {item.EndDate} </StyledDate>
          <StyledLike
            onClick={() => {
              setLike(Like + 1);
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color="red"
              size="2x"
            ></FontAwesomeIcon>
            {Like}
          </StyledLike>
          {/* <TimeContainer>
            <div>{'⏱️ ' + moment(item.createdAt).fromNow()}</div>
          </TimeContainer> */}
        </SubContainer>
      </DivContainer>
    </>
  );
};

const DivContainer = styled.div`
  border: 1px solid var(--gray-100);
  border-radius: 1rem;
  width: 90%;
  margin: 0.5rem 0 0.5rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 좌우 정렬을 위한 설정 */
  padding: 1rem; /* 내부 간격 설정 */
`;

const TitleContainer = styled.div`
  margin: 0.5rem 0 0.5rem 0;
`;

const TimeContainer = styled.div`
  /* 추가적인 스타일이 필요하다면 여기에 작성 */
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;
const StyledUserName = styled.div`
  margin-left: 1rem;
`;
const StyledDate = styled.div`
  margin-left: 1rem;
`;
const StyledLike = styled.div`
  // margin-left: 1rem;

  position: absolute;
  left: 90%;
`;
