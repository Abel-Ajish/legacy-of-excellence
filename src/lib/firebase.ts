import messagesData from '@/data/messages.json';

export interface Message {
  name: string;
  message: string;
  role: string;
  createdAt: string;
}

export function getMessages(): Message[] {
  return messagesData as Message[];
}
