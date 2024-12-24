import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a valid Gmail address"
    )
    // .required("Email is required")
    ,
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});



 export const stdRecSchema = Yup.object({
    name: Yup.string().required("Please enter name!"),
    email: Yup.string()
      .required("Please enter email!")
      .email("Please enter valid email"),
    std_class: Yup.string().required("Please enter class!"),
    roll_no: Yup.number().required("Please enter roll number!"),
  });


  export const dropFileSchema = Yup.object({
    file: Yup.mixed()
      .required("Please Select a file.")
      .test(
        "fileType",
        "Please upload a valid Excel file (.xlsx or .xls)",
        (file) =>
          file &&
          (file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.type === "application/vnd.ms-excel")
      ),
  });
