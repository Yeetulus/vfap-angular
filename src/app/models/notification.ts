export enum NotificationType {
  Success = 'success',
  Error = 'error',
}
export interface Notification {
  message: string;
  type: NotificationType;
  duration: number;
  remove: () => void;
}
