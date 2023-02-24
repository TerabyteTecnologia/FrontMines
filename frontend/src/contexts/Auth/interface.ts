export interface AuthContextProps {
  login: (data: LoginProps) => void;

  isAuthentication: boolean;
}

export interface AuthContextProviderType {
  children: React.ReactNode;
}

export interface LoginProps {
  email: string;
  password: string;
}