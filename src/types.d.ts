interface AuthRequest {
  user: {
    sub: string;
    email: string;
    refreshToken?: boolean;
  };
}
