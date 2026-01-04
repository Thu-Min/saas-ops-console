export interface JwtPayload {
  sub: string; // userId
  organizationId: string;
  role: string;
}
