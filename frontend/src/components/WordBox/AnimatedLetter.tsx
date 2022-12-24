import { AnimatedSpan } from './styles';
interface AnimatedLetterProps {
  children: React.ReactNode;
  animate: boolean;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ children, animate }) =>
  animate ? <AnimatedSpan>{children}</AnimatedSpan> : <>{children}</>;

export default AnimatedLetter;
