export interface NominationFormInput {
  id?: string;
  name: string;
  description: string;
  formStructure: any;
}

export interface NominationForm extends NominationFormInput {
  createdAt: Date;
  updatedAt: Date;
}
