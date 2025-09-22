export interface DispenserModel {
  dispenserNo: number;
  quantity: number;
  vehicleNumber: string;
  paymentMode: number;
  paymentProof?: File|null;
}

export interface IResponseModel<T> {
  sucess: boolean;
  data: T;
  message: string;
}


export interface DispensingRecordDto {
  id:number;
  dispenserNo: string;
  quantity: number;
  vehicleNumber: string;
  paymentMode: string;
  timestamp: string; // ISO date string
  paymentProofUrl: string;
}




