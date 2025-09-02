import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AuthPage: React.FC = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("User Info:", decoded);
      // You can send credentialResponse.credential to your backend for verification
    }
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-gray-600 mb-6">
          Sign in or create an account with Google
        </p>
        <GoogleOAuthProvider clientId="962264895991-93et5a8stepe4osg77oj9gh0am4cc897.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            shape="pill"
            text="signin_with"
            width="100%"
          />
        </GoogleOAuthProvider>

        <div className="mt-6 text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
