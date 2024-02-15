import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../../api/index';
interface UploadReviewProps {
  id?: number;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  context?: string;
  imageLinks?: string[];
}
interface imageFilesType {
  file: File[];
  url: string[];
}
interface ModalProps {
  onClose: () => void;
}
export const NewFile = ({
  id,
  isEdit,
  setIsEdit,
  context,
  imageLinks,
  onClose, // 이 부분을 추가하여 onClose를 props로 받도록 합니다.
}: UploadReviewProps & ModalProps) => {
  //사진 업로드
  const [imageFiles, setImageFiles] = useState<imageFilesType>({
    file: [],
    url: imageLinks || [],
  });
  const [deleteUrl, setDeleteUrl] = useState([]);
  const [preview, setPreview] = useState(imageLinks || []);

  // 인증 토큰
  const accessToken = localStorage.getItem('accessToken');

  // 리뷰 등록
  const postReview = async (formData: FormData) => {
    // formData값 확인
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await API.POST({
        url: `${process.env.REACT_APP_SERVER_URL}green/review/${id}`,
        data: formData,
        headers: {
          Authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageFiles({ file: [], url: [] });
      setPreview([]);

      if (res.status === 409) {
        alert('이미 등록된 리뷰가 존재합니다.');
        return;
      } else if (res.status === 500) {
        alert('리뷰 등록에 실패하였습니다.');
        return;
      }

      alert('리뷰가 등록되었습니다.');

      console.log('review post');
      console.log(res.data);
    } catch (err) {
      console.log('review post err');
      console.log(err);

      alert('리뷰 등록에 실패하였습니다.');
    }
  };

  // 리뷰 작성

  // 이미지 파일 업로드, 프리뷰
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const addFiles = [...imageFiles.file, ...files];
    setImageFiles({
      ...imageFiles,
      file: addFiles,
    });

    const previewArray = files.map((data) => window.URL.createObjectURL(data));
    const addPreviews = [...preview, ...previewArray];
    setPreview(addPreviews);

    e.target.value = '';
  };
  // 이미지 파일 삭제
  const deleteFileHandler = (index: number) => {
    const fileLen = imageFiles.file.length;
    const urlLen = imageFiles.url.length;
    const sliceIndex = index - urlLen;
    if (sliceIndex >= 0) {
      setImageFiles({
        ...imageFiles,
        file: [
          ...imageFiles.file.slice(0, sliceIndex),
          ...imageFiles.file.slice(sliceIndex + 1, fileLen),
        ],
      });
    } else {
      setImageFiles({
        ...imageFiles,
        url: [
          ...imageFiles.url.slice(0, index),
          ...imageFiles.url.slice(index + 1, urlLen),
        ],
      });
      setDeleteUrl([...deleteUrl, imageFiles.url[index]]);
    }

    setPreview([
      ...preview.slice(0, index),
      ...preview.slice(index + 1, preview.length),
    ]);
  };

  // 작성한 리뷰 등록
  const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    // const deleteImagesLinks = {
    //   deleteImageLinks: deleteUrl,
    // };

    // formData.append(
    //   'deleteImages',
    //   new Blob([JSON.stringify(deleteImagesLinks)], {
    //     type: 'application/json',
    //   }),
    // );
    imageFiles.file.forEach((file) => formData.append('images', file));

    // postReview(formData);
  };
  const handleUpload = () => {
    onClose();
    console.log(imageFiles);
    alert('업로드 하였습니다.');
  };
  return (
    <>
      {' '}
      <Form onSubmit={submitReviewHandler}>
        <PreviewWrapper>
          {preview.map((image, index) => (
            <Preview key={index}>
              <img className="previewImg" src={image} alt="업로드 사진" />
              <div className="delete" onClick={() => deleteFileHandler(index)}>
                삭제
              </div>
            </Preview>
          ))}
        </PreviewWrapper>
        <FileUploadButton>
          사진 업로드
          <FontAwesomeIcon icon={faCloudArrowUp} />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={uploadFileHandler}
            className="inputfile"
          />
        </FileUploadButton>
        <div className="guide">1MB 이하의 이미지만 선택해주세요.</div>{' '}
        <div className="upload" onClick={handleUpload}>
          Upload
        </div>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .upload {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 1rem 1rem 2rem;
    border: 0.00625rem solid var(--gray-100);
    width: 4.3rem;
    height: 2rem;
    position: relative;
    left: -0.5rem;
    border-radius: 0.3rem;
    background-color: var(--blue-100);
    color: var(--white);
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  .inputfile {
    display: none;
  }

  .editButton {
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: var(--gray);

    width: 3rem;
    padding: 0.5rem;
    margin-left: 0.3rem;

    &:hover {
      color: var(--green-200);
    }
  }

  .submitButton {
    cursor: pointer;
    border: none;
    background-color: var(--green-100);
    color: var(--white);
    border-radius: 0.5rem;
    width: 5rem;
    margin-left: 1rem;
    padding: 1rem;

    &:hover {
      background-color: var(--blue-200);
    }
  }

  .guide {
    color: var(--green-200);
    font-size: 0.7rem;
    margin-top: 0.5rem;
  }
`;

const FileUploadButton = styled.label`
  border: 0.1rem solid var(--green-100);
  border-radius: 0.5rem;
  color: var(--green-100);

  width: 7rem;
  padding: 0.5rem;
  font-size: 0.75rem;

  display: flex;
  justify-content: space-evenly;

  align-items: center;

  cursor: pointer;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

const Preview = styled.div`
  position: relative;
  margin: 0.25rem 0;
  margin-right: 0.25rem;
  background-color: var(--gray-100);
  width: 8rem;
  height: 8rem;
  border: 1px solid var(--blue-100);

  .previewImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: 0.5s ease;
    backface-visibility: hidden;
  }

  .delete {
    cursor: pointer;
    color: var(--black);
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  &:hover .delete {
    opacity: 1;
  }
  &:hover .previewImg {
    opacity: 0.3;
  }
`;
