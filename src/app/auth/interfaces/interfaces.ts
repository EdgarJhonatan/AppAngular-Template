export interface AuthResponse {
  codRes: string;
  message?: string;
  nombre?: string;
  documento?: string;
  token?: string;
}

export interface Usuario {
  documento: string;
  nombre: string;
}
