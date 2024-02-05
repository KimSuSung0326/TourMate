import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { TravelItems } from 'component/Travel/TravelItems';
import { TravelList } from 'component/Travel/TravelList';
import { useState, useEffect } from 'react';
import useIntersectionObserver from 'component/InfinityScroll/useIntersectionObserver';
const StyledMyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border: 0.03rem solid var(--gray-100);
  border-radius: 1rem;
  box-shadow: 0.15rem 0.15rem 0.15rem var(--gray-200);
  width: 99%;
  margin: 0 auto;
  padding: 0.5rem 0 0.5rem 0;
  .Title {
    position: relative;
    left: -40%;
  }
`;
const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32rem;
  background-color: black;
  color: white;
  font-size: 3rem;
  border-radius: 1rem;
`;
export const MyTravel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0); // 데이터의 현재 Index
  const [data, setData] = useState(TravelItems.slice(0, 10)); //TravelItems를 0~9 까지 자르기
  const testFetch = (delay = 1000) =>
    new Promise((res) => setTimeout(res, delay));

  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setData((prevData) => {
      const nextIndex = itemIndex + 1;
      const newData = TravelItems.slice(nextIndex, nextIndex + 10); // 예시로 10개를 가져오도록 설정
      setItemIndex(nextIndex + newData.length); // 새로운 index 설정
      console.log('nextIndex:', nextIndex);
      console.log('newData:', newData);
      return [...prevData, ...newData];
    });
    setIsLoaded(false);
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer,
  ) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });
  return (
    <>
      <StyledMyPageWrap>
        {' '}
        <h2 className="Title">내 여행일정 </h2>
        {data.map((item, index) => (
          <TravelList item={item} key={index}></TravelList>
        ))}
        <div className="isLoading" ref={setTarget}>
          {isLoaded ? <StyledLoading>Loading...</StyledLoading> : null}
        </div>
      </StyledMyPageWrap>
    </>
  );
};
