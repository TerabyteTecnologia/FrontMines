export interface AuthContextProps {
  login: (data: LoginProps) => void;
  logout:() =>void;
  isAuthentication: boolean;
  user:string | null; 
}

export interface AuthContextProviderType {
  children: React.ReactNode;
}

export interface LoginProps {
  email: string;
  senha: string;
}