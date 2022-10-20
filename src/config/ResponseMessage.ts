type ResponseMessageTypes = (
  type:
    | "create"
    | "delete"
    | "update"
    | "error"
    | "nodata"
    | "notfound"
    | "duplicate"
) => string;

export const ResponseMessage: ResponseMessageTypes = (type) => {
  switch (type) {
    case "create":
      return "Data created successfully";
    case "delete":
      return "Data deleted successfully";
    case "update":
      return "Data updated successfully";
    case "error":
      return "Unexpected error";
    case "nodata":
      return "Data is missing";
    case "notfound":
      return "Data not found";
    case "duplicate":
      return "Duplicate data";
    default:
      return "Unexpected error";
  }
};
