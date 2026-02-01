export interface FormData {
  name: string;
  host: string;
  notes: string;
  isConfirmed: boolean | null;
  hasPlusOne: boolean;
  companionName: string;
}

export interface FormProps {
  inviteeId: string,
  inviteeName: string | undefined
}
