import Errors from '@components/errors';
import { Container } from './styles';

const AccountBlocked = () => {
  return (
    <Container>
      <Errors title="Conta Bloqueada!" message="Sua conta foi bloqueada por um administrador. Se você acredita que isso é um erro, entre em contato com o suporte."/>
    </Container>
  );
};

export default AccountBlocked;
