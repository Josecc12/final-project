type Departure = {
    id: string;
    createdAt: string; // ISO 8601 date format
    descripcion: string;
    user: {
      id: string;
      username: string;
    };
    detalleRetiro: {
      id: string;
      nombreInsumo: string;
      cantidad: number;
    }[];
  };

  export default Departure;