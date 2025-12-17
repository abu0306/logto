import { z } from 'zod';

export const profileMapGuard = z
  .object({
    id: z.string().optional().default('id'),
    email: z.string().optional().default('email'),
    phone: z.string().optional().default('phone'),
    name: z.string().optional().default('name'),
    avatar: z.string().optional().default('avatar'),
  })
  .optional()
  .default({
    id: 'id',
    email: 'email',
    phone: 'phone',
    name: 'name',
    avatar: 'avatar',
  });

export type ProfileMap = z.infer<typeof profileMapGuard>;

export const userProfileGuard = z.object({
  id: z.string().or(z.number()).transform(String),
  email: z.string().optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileGuard>;

const tokenEndpointResponseTypeGuard = z
  .enum(['query-string', 'json'])
  .optional()
  .default('query-string');

export type TokenEndpointResponseType = z.input<typeof tokenEndpointResponseTypeGuard>;

export const oauth2ConnectorConfigGuard = z.object({
  responseType: z.literal('code').optional().default('code'),
  grantType: z.literal('authorization_code').optional().default('authorization_code'),
  clientId: z.string(),
  clientSecret: z.string(),
  scope: z.string().optional(),
  tokenEndpointResponseType: tokenEndpointResponseTypeGuard,
  profileMap: profileMapGuard,
});

export type Oauth2ConnectorConfig = z.infer<typeof oauth2ConnectorConfigGuard>;

export const oauth2AuthResponseGuard = z.object({
  code: z.string(),
  state: z.string().optional(),
});

export type Oauth2AuthResponse = z.infer<typeof oauth2AuthResponseGuard>;

export const oauth2AccessTokenResponseGuard = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
});

export type Oauth2AccessTokenResponse = z.infer<typeof oauth2AccessTokenResponseGuard>;
