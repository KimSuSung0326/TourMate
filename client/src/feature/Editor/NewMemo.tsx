import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { styled } from 'styled-components';
import { EditorComponent } from './WebEditor';

interface EditorProps {
  contents: string;
  setContents: (content: string) => void;
}

const NewMemo: React.FC<EditorProps> = ({ contents, setContents }) => {
  return (
    <DivContainer>
      <EditorComponent contents={contents} setContents={setContents} />
      <div dangerouslySetInnerHTML={{ __html: contents }}></div>
    </DivContainer>
  );
};

export default NewMemo;

const DivContainer = styled.div`
  width: 100%;
  height: 18rem;
`;
