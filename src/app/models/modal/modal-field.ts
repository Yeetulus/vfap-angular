export interface ModalField {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'number' | 'multiselect' | 'select' | 'datepicker';
  options?: { display: string; value: any }[];
  initialValue?: any;
}
