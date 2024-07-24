import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { apiCall } from "@/helpers/api";

function App() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await apiCall("/auth/google", {
        method: "POST",
        body: {
          access_token: credentialResponse.credential,
        },
        isAuth: false,
      });
      const { access, refresh } = response.data.token;
      // Store tokens in local storage or cookie for further API calls
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="296527608242-1h0bgv8sjt2n0l005l8cdml9dfur04do.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
