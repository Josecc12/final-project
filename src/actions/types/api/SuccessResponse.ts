type SuccessReponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

export default SuccessReponse;