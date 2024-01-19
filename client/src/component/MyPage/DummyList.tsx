export interface List {
  title: string;
  createdAt: string;
  userName: string;
  StartDate: string;
  EndDate: string;
}

export const DummyList: List[] = [
  {
    title: '여행 리뷰 제목 1',
    createdAt: '2024-01-05 09:23:14',
    userName: '홍길동',
    StartDate: '2023-07-11',
    EndDate: '2023-07-13',
  },
  {
    title: '여행 리뷰 제목 2',
    createdAt: '2023-07-05 09:23:14',
    userName: '짱구',
    StartDate: '2023-07-11',
    EndDate: '2023-07-13',
  },
  {
    title: '여행 리뷰 제목 3',
    createdAt: '2023-12-05 09:23:14',
    userName: '김삿갓',
    StartDate: '2023-07-11',
    EndDate: '2023-07-13',
  },
];
