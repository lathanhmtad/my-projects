import BaseResponse from './BaseResponse';

export interface ParticipantResponse extends BaseResponse {
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  enabled: boolean;
}