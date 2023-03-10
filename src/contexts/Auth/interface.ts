export interface AuthContextProps {
  login: (data: LoginProps) => void;
  recovery: (data: RecoveryProps) => void;
  logout:() =>void;
  isAuthentication: boolean;
  user:string | null; 
  loading:boolean;
}

export interface AuthContextProviderType {
  children: React.ReactNode;
}

export interface LoginProps {
  email: string;
  senha: string;
}

export interface RecoveryProps {
  email: string;
  senha: string;
  senhaNova:string;
}