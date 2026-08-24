export interface PlatformSessionStatus {
  authenticated: boolean;
  csrfToken?: string;
}

export interface PlatformLinkedIdentity {
  identityId: string;
  provider: 'KEYCLOAK' | 'MINECRAFT' | 'DISCORD';
  externalId: string;
  verifiedAt: string;
}

export interface PlatformPlayerProfile {
  playerId: string;
  currentName: string;
  identities: PlatformLinkedIdentity[];
}
