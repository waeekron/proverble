import { StyledKey } from './styles';

const Key: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant: [variant: 'wrong' | 'almost' | 'correct' | 'notGuessed'];
}> = ({ children, onClick, variant }) => {
  const [variantValue] = variant;
  return (
    <StyledKey variant={variantValue} onClick={onClick}>
      {children}
    </StyledKey>
  );
};

export default Key;
