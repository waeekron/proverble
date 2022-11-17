import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  margin: 1em;
`;

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header>
      <Title>{children}</Title>
    </header>
  );
};

export default Header;
