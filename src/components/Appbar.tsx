import styled, { ThemeContext } from 'styled-components';
import {
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi';
import { useContext, useState } from 'react';

const AppbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8em;
  width: 100%;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5em;
  font-size: 1.6rem;
`;

const Logo = styled.h1`
  color: pink;
  text-transform: none;
  font-size: 1.5em;
`;

export const L = styled.span<{ borderWidth?: number }>`
  color: ${({ color }) => color};
  display: inline-block;
  border-bottom: ${({ borderWidth, color }) =>
    `${borderWidth || 5}px solid ${color}`};
  min-width: 1rem;
  min-height: 1rem;
  margin-right: 0.1em;
  font-size: 1em;
`;

const Split = styled.span<{ split: boolean; direction: number }>`
  display: inline-block;
  transform: ${({ split, direction }) =>
    split === true ? `translate(0px, ${direction}px)` : ''};
  transition: all 0.2s ease-in;
`;

interface HeaderProps {
  theme: any;
  changeTheme: () => void;
}

const Appbar: React.FC<HeaderProps> = ({ theme, changeTheme }) => {
  const [split, setSplit] = useState(false);

  return (
    <AppbarContainer>
      <Logo
        onMouseEnter={() => {
          setSplit(true);
          console.log(split, 'split');
        }}
        onMouseLeave={() => {
          setSplit(false);
          console.log(split);
        }}
      >
        <Split split={split} direction={5}>
          <L color="#4285F4">s</L>
          <L color="#4285F4">a</L>
          <L color="#F4B400">n</L>
        </Split>
        <Split split={split} direction={-5}>
          <L color="#F4B400">o</L>
          <L color="#0F9D58">n</L>
          <L color="#0F9D58">t</L>
          <L color="#0F9D58">a</L>
        </Split>
      </Logo>
      <ButtonGroup>
        <Button onClick={() => changeTheme()}>
          {theme.name === 'light' ? (
            <HiOutlineMoon fill="#5a5a97" color="#5a5a97" size={'1.5rem'} />
          ) : (
            <HiOutlineSun fill="yellow" color="yellow" size="1.5rem" />
          )}
        </Button>
        {/* <Button>
          <HiOutlineQuestionMarkCircle size={'1.6rem'} />
        </Button> */}
      </ButtonGroup>
    </AppbarContainer>
  );
};

export default Appbar;
