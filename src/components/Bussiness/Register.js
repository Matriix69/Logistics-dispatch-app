import { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

const validationSchema = yup.object().shape({
    email: yup.string().email("This is not a valid email").required("Required"),
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    address: yup.string().required("Required"),
    phonenumber: yup.number().typeError("numbers only").required("Most be a phone number").positive().integer(),
    password: yup.string().min(6).required("password must be atleast 6 characters"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("Passwords don't match"),
    acceptTerms: yup.bool().oneOf([true], "Terms & Conditions must be accepted"),
});

export default function Register({ onRouteChange, handleOpen }) {
    const history = useHistory();
    const [error, setError] = useState(null);

    const { signup, updateUser } = useAuth();

    return (
        <div>
            <div>
                <p className="text text-title-register">Create Account</p>
                <Formik
                    initialValues={{
                        email: "",
                        firstname: "",
                        lastname: "",
                        address: "",
                        phonenumber: "",
                        password: "",
                        confirmpassword: "",
                        acceptTerms: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const username = values.email;
                        const password = values.password;
                        const name = values.firstname + " " + values.lastname;
                        const address = values.address;
                        const phone = values.phonenumber;

                        const profileUpdateDetails = {
                            displayName: name,
                            photoURL: phone,
                        };
                        const profileDetailsToDb = {
                            username: name,
                            email: username,
                            phone: phone,
                            address: address,
                        };
                        const walletBalance = {
                            amount: 0,
                        };

                        async function signUp() {
                            try {
                                setSubmitting(true);
                                setError(null);

                                const newUser = await signup(username, password);
                                if (newUser.user) {
                                    await updateUser(profileUpdateDetails);
                                }

                                const userInfoRef = doc(db, "users", newUser.user.uid);
                                const userwalletAccount = doc(db, "users", newUser.user.uid, "wallet", "balaance");
                                await Promise.all([
                                    setDoc(userInfoRef, profileDetailsToDb),
                                    setDoc(userwalletAccount, walletBalance),
                                ]);
                                console.log("good");
                                history.push("/confirm-signup");
                            } catch (error) {
                                let err2 = null;
                                if (
                                    error &&
                                    error.message.toLowerCase() === "Firebase: Error (auth/timeout).".toLowerCase()
                                ) {
                                    err2 = {
                                        message: "Request timeout, please check your internet connect",
                                    };
                                } else if (
                                    error &&
                                    error.message.toLowerCase() ===
                                        "Firebase: Error (auth/network-request-failed).".toLowerCase()
                                ) {
                                    err2 = {
                                        message: "Request timeout, please check your internet connect",
                                    };
                                } else if (
                                    error &&
                                    error.message.toLowerCase() ===
                                        "Firebase: Error (auth/email-already-in-use).".toLowerCase()
                                ) {
                                    err2 = {
                                        message: "User already exists",
                                    };
                                } else {
                                    err2 = {
                                        message: "something went wrong, please try again",
                                    };
                                }
                                setError(err2.message);
                                setSubmitting(false);
                                // console.log(error, err2);
                            }
                        }
                        signUp();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div
                                className={`input-business ${errors.firstname && touched.firstname && "error errmsg"} `}
                            >
                                <p className="text text-small input-label">First Name</p>
                                <div className="input-field">
                                    <input
                                        name="firstname"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.firstname}
                                    />
                                </div>
                            </div>
                            {errors.firstname && touched.firstname ? (
                                <div className="errorMessage">{errors.firstname}</div>
                            ) : null}
                            <div className={`input-business ${errors.lastname && touched.lastname && "error errmsg"} `}>
                                <p className="text text-small input-label">Last Name</p>
                                <div className="input-field">
                                    <input
                                        name="lastname"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.lastname}
                                    />
                                </div>
                            </div>
                            {errors.lastname && touched.lastname ? (
                                <div className="errorMessage">{errors.lastname}</div>
                            ) : null}
                            <div
                                className={`input-business ${
                                    errors.phonenumber && touched.phonenumber && "error errmsg"
                                } `}
                            >
                                <p className="text text-small input-label">Phone Number</p>
                                <div className="input-field">
                                    <p className="text text-regular prepend">+234</p>
                                    <input
                                        name="phonenumber"
                                        type="tel"
                                        value={values.phonenumber}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleChange(e);
                                            const { value } = e.target;
                                            const regex = /^[0-9\b]+$/;
                                            if (value === "" || regex.test(value)) {
                                                setFieldValue("phonenumber", value);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            {errors.phonenumber && touched.phonenumber ? (
                                <div className="errorMessage">{errors.phonenumber}</div>
                            ) : null}
                            <div className={`input-business ${errors.password && touched.password && "error errmsg"} `}>
                                <p className="text text-small input-label">Password</p>
                                <div className="input-field">
                                    <input
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                </div>
                            </div>
                            {errors.password && touched.password ? (
                                <div className="errorMessage">{errors.password}</div>
                            ) : null}
                            <div
                                className={`input-business ${
                                    errors.confirmpassword && touched.confirmpassword && "error errmsg"
                                } `}
                            >
                                <p className="text text-small input-label">Confirm Password</p>
                                <div className="input-field">
                                    <input
                                        name="confirmpassword"
                                        type="password"
                                        onChange={handleChange}
                                        value={values.confirmpassword}
                                    />
                                </div>
                            </div>
                            {errors.confirmpassword && touched.confirmpassword ? (
                                <div className="errorMessage">{errors.confirmpassword}</div>
                            ) : null}
                            <div className={`input-business ${errors.email && touched.email && "error errmsg"} `}>
                                <p className="text text-small input-label">Corporate email</p>
                                <div className="input-field">
                                    <input name="email" type="email" onChange={handleChange} value={values.email} />
                                </div>
                            </div>
                            {errors.email && touched.email ? <div className="errorMessage">{errors.email}</div> : null}
                            <div className={`input-business ${errors.address && touched.address && "error errmsg"} `}>
                                <p className="text text-small input-label">Company Address</p>
                                <div className="input-field">
                                    <input name="address" type="text" onChange={handleChange} value={values.address} />
                                </div>
                            </div>
                            {errors.address && touched.address ? (
                                <div className="errorMessage">{errors.address}</div>
                            ) : null}
                            <div className="tandc-checkbox">
                                <Field
                                    type="checkbox"
                                    name="acceptTerms"
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (e.target.checked) {
                                            handleOpen();
                                        } else {
                                            return;
                                        }
                                    }}
                                />
                                <p className="text text-small tandc-label" onClick={handleOpen}>
                                    Accept terms and conditions
                                </p>
                            </div>
                            {errors.acceptTerms && touched.acceptTerms ? (
                                <div className="errorMessage">{errors.acceptTerms}</div>
                            ) : null}

                            {error ? <p className="errorMessage">{error}</p> : null}

                            {/* botton */}
                            <div className="btn-access">
                                <button
                                    className="btn-primary-contact text text-regular"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="sending-message">
                                            <div className="spinner2"></div>
                                            <p>Processing</p>
                                        </div>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </div>
                            <p className="text text-small signin-request">
                                Already have an account?
                                <span onClick={onRouteChange} className="signup-link">
                                    {" "}
                                    Log In!
                                </span>
                            </p>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
