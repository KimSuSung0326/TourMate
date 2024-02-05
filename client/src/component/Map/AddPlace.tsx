import { useState, useEffect } from 'react';
import { InputBar } from 'feature/Input/InputBar';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaceList } from '../../redux/reducers/setSelectedPlace';
declare global {
  interface Window {
    kakao: any;
  }
}
const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  justify-content: center;

  #pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
`;
const StyledMainWrap = styled.div`
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: var(--white);
  box-shadow: 0.3rem 0.3rem var(--gray-100);
  height: 20rem;
  .item-phone {
    color: var(--blue-200);
    display: flex;
    flex-direction: column;
  }
  .subContainer > .list-btn {
    width: 3rem;
    height: 2rem;
    border-radius: 0.5rem;
    position: relative;
    left: 3%;
  }
`;
const StyledClickBtn = styled.button`
  width: 4rem;
  height: 2rem;
  margin: 0 0 0 1rem;
  background-color: var(--white);
  box-shadow: 0.1rem 0.1rem var(--gray-100);
`;
const StyledMargin = styled.div`
  margin: 0 0 4rem 0;
`;
export const AddPlace = () => {
  const [value, Setvalue] = useState(''); // input 상태
  const [keyValue, SetkeyValue] = useState(''); // 키워드 상태
  const [Array, SetArray] = useState([]); // 응답 데이터를 저장 할 배열
  const [selectedPlace1, setSelectedPlace] = useState(''); // 선택한 장소의 place_name 상태
  const [selectedPlaceList, setSelectedPlaceList] = useState([]); // 선택된 장소 항목을 저장하는 배열
  const dispatch = useDispatch();

  const onChange = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    Setvalue(e.target.value);
  };
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    SetkeyValue(value);
    Setvalue('');
  };
  const onclick = () => {
    SetkeyValue(value);
  };
  const handlePlaceClick = (place_name: string) => {
    // const placeObject = {
    //   type: 'place',
    //   name: place_name,
    // };
    setSelectedPlace(place_name);
    setSelectedPlaceList((prevList) => [...prevList, place_name]);
    console.log(place_name);
  };

  useEffect(() => {
    dispatch(setPlaceList(selectedPlaceList));
  }, [selectedPlaceList]);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();
    searchPlaces(); // 검색 시작

    function searchPlaces() {
      if (!keyValue.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyValue, placesSearchCB);
    }
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPagination(pagination);
        SetArray(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }
    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination: any) {
      const paginationEl = document.getElementById('pagination') as HTMLElement;
      const fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i.toString();

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }
  }, [keyValue]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <InputBar
          value={value}
          onChange={onChange}
          placeholder="검색어를 입력 해주세요."
          type="text"
        ></InputBar>
        <StyledClickBtn onClick={onclick}>검색</StyledClickBtn>
        <StyledMargin />
      </form>
      <StyledMainContainer>
        {Array.map((item, i) => (
          <StyledMainWrap key={i}>
            <div className="subContainer">
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span className="item-phone">{item.phone}</span>
              <button
                className="list-btn"
                onClick={() => handlePlaceClick(item.place_name)}
              >
                추가
              </button>
            </div>
          </StyledMainWrap>
        ))}
        <div id="pagination"></div>
      </StyledMainContainer>
    </>
  );
};
