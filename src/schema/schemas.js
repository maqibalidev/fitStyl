import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a valid Gmail address"
    )
    .required("Email is required")
    ,
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
});


export const registerSchema = Yup.object({
  name: Yup
  .string()
  .min(3, 'Username must be at least 3 characters')
  .required('Username is required'),

email: Yup
  .string()
  .email('Invalid email format')
  .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid @gmail.com address')
  .required('Email is required'),

password: Yup
.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[0-9]/, 'Password must contain at least one digit')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .required('Password is required'),

  confirm_password: Yup
  .string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm Password is required')
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
          (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.type === "application/vnd.ms-excel")
      ),
  });


  export const resetPassSchema = Yup.object({
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  });


  export const forgetPassSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid Gmail address"
      )
      .required("Email is required")
  });



  export const accountSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
  
    email: Yup.string()
      .email('Invalid email format')
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid @gmail.com address')
      .required('Email is required'),
  
    address: Yup.string()
.min(10,"Address is too short"),
  
    currentPass: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  
    confirmPass: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  }).test(
    'password-fields-dependency',
    'If any password field is filled, all password fields (currentPass, password, confirmPass) are required',
    (values) => {
      const { currentPass, password, confirmPass } = values;
  
      const isAnyPasswordFieldFilled = !!currentPass || !!password || !!confirmPass;
  
      if (isAnyPasswordFieldFilled) {
        // Ensure all fields are filled
        return currentPass && password && confirmPass;
      }
  
      // If no password field is filled, it's valid
      return true;
    }
  );
  