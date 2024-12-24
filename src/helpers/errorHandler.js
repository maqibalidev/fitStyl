import { toast } from "react-toastify";

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status outside 2xx
    try {
      console.error("API Error:", error.response.data);
      toast.error(
        error.response.data.message ||
          error.response.data.errors[0].msg ||
          "An error occurred."
      );
    } catch (error) {
      toast.error("Something went wrong.");
    }
  } else if (error.request) {
    // Request made but no response received
    console.error("No Response:", error.request);
    toast.error("No response from the server. Please try again later.");
  } else {
    // Other errors
    console.error("Error:", error.message);
    toast.error(error.message || "Something went wrong.");
  }
};
