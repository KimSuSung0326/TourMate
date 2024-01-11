import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
const StyledFooterContainer = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background-color: var(--blue-100);
  padding: 1rem;
  margin-top: 3rem;
`;

const StyledTeaMember = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  list-style-type: none;
`;

const StyledItemList = styled.div``;

const StyledListItem = styled.li`
  text-align: left;
  color: var(--white);
`;
const StyledGitid = styled(Link)`
  text-align: left;
  color: var(--white);
  text-decoration: none;
  padding-left: 0.624rem;
`;
interface TeamMember {
  name: string;
  githubId: string;
  githubUrl: string;
}

const Teammembers: TeamMember[] = [
  {
    name: '김수성',
    githubId: '@KimSuSung0326',
    githubUrl: 'https://github.com/KimSuSung0326',
  },
  {
    name: '도희정',
    githubId: ' @ehgm',
    githubUrl: 'https://github.com/devlearning98',
  },

  {
    name: '백도담',
    githubId: ' @BAEKDODAM',
    githubUrl: 'https://github.com/BAEKDODAM',
  },
  {
    name: '김리나',
    githubId: ' @LinaKK',
    githubUrl: 'https://github.com/LinaKK',
  },
];
export const Footer = () => {
  return (
    <>
      <StyledFooterContainer>
        <StyledTeaMember>
          <StyledItemList>
            {Teammembers.map((member) => {
              return (
                <StyledListItem key={member.name}>
                  {member.name}ㅣGitHub:
                  <StyledGitid to={member.githubUrl}>
                    {member.githubId}
                  </StyledGitid>
                </StyledListItem>
              );
            })}
          </StyledItemList>
        </StyledTeaMember>
      </StyledFooterContainer>
    </>
  );
};
