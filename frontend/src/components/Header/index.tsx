import logout from '../../assets/icons/logout.svg';
import { useAuth } from '../../contexts/Auth';

import { HeaderContainer, HeaderContent } from './styles';

export function Header() {

  // const { user } = useAuth(); // RECUPERAR USER PARA MOSTRAR SEU NOME

  return (
    <HeaderContainer>
      <HeaderContent>
        <span>Alisson</span>
        <a>Sair {`\n`}
          <img src={logout} />
        </a>
      </HeaderContent>
    </HeaderContainer>
  );
}