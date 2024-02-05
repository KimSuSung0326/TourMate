import { useState, useEffect } from 'react';
interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}
//IntersectionObserver 커스텀 훅, 무한 스크롤을 위한 커스텀 훅
const useIntersectionObserver = ({
  root,
  rootMargin,
  threshold,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null); // 관찰 요소 등록
  //원래는 target을 useRef를 사용하여 Dom 요소에 접근 해야 했으나 useRef는 참조값의 변경사항을 알려주지 않기 때문에 useState를 사용.
  //observer 등록 (교차 관찰자) -> observer 안에 있는 callBack 함수는 onIntersect를 사용
  useEffect(() => {
    if (!target) return;
    // 교차관찰자 선언
    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold },
    );
    observer.observe(target); // 관찰 요소를 교차관찰자에게 전달 // 관찰 시작
    return () => observer.unobserve(target); // clean-up 함수
  }, [onIntersect, root, rootMargin, target, threshold]);
  return { setTarget };
};
export default useIntersectionObserver;
