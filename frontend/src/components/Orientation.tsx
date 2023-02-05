import useIsMobile from '../hooks/useIsMobile';
import useScreenOrientation from '../hooks/useScreenOrientation';
import { Div } from '../styles/styled';

type OrientationProps = {
  children: React.ReactNode;
};

export default function Orientation({ children }: OrientationProps) {
  const orientation = useScreenOrientation();
  const isMobile = useIsMobile(1000);
  return (
    <>
      {orientation === 'portrait-primary' || !isMobile ? (
        children
      ) : (
        <Div width="100%" height="100vh" justify="space-around" align="center">
          KÄÄNNÄ NÄYTTÖ PYSTY ASENTOON :)
        </Div>
      )}
    </>
  );
}
