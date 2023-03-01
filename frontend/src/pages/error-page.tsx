import { useRouteError } from 'react-router-dom';
import { Container, Div } from '../styles/styled';

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <Div flexDirection="column" align="center" justify="space-between">
      <Container>
        <Div flexDirection="column">
          {' '}
          <h1>Hupsista!</h1>
          <p>Kävi jokin virhe...</p>
          <p>
            <i>
              {
                //@ts-ignore
                error.statusText || error.message
              }
            </i>
          </p>
        </Div>
      </Container>
    </Div>
  );
}
