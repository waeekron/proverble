import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { useState, useRef } from 'react';
import { AppbarContainer, Button, ButtonGroup, Logo, Split } from './styles';
import { L } from '../../styles/styled';
import { base, dark, light } from '../../styles/themes';

interface HeaderProps {
  currentTheme: any;
  setCurrentTheme: any;
}

const Appbar: React.FC<HeaderProps> = ({ currentTheme, setCurrentTheme }) => {
  const [split, setSplit] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  function handleClick(): void {
    changeTheme();
    buttonRef.current?.blur();
  }

  function changeTheme() {
    if (currentTheme.name === 'light')
      setCurrentTheme({ ...base, ...dark, name: 'dark' });
    if (currentTheme.name === 'dark')
      setCurrentTheme({ ...base, ...light, name: 'light' });
  }
  return (
    <AppbarContainer>
      <Logo
        onMouseEnter={() => {
          setSplit(true);
        }}
        onMouseLeave={() => {
          setSplit(false);
        }}
      >
        <Split split={split} direction={-5}>
          <L color="#4285F4">s</L>
          <L color="#4285F4">a</L>
          <L color="#F4B400">n</L>
        </Split>
        <Split split={split} direction={5}>
          <L color="#F4B400">o</L>
          <L color="#0F9D58">n</L>
          <L color="#0F9D58">t</L>
          <L color="#0F9D58">a</L>
        </Split>
      </Logo>
      <ButtonGroup>
        <Button onClick={handleClick} ref={buttonRef}>
          {currentTheme.name === 'light' ? (
            <HiOutlineMoon fill="#5a5a97" color="#5a5a97" size={'1.5rem'} />
          ) : (
            <HiOutlineSun fill="yellow" color="yellow" size="1.5rem" />
          )}
        </Button>
      </ButtonGroup>
    </AppbarContainer>
  );
};

export default Appbar;
