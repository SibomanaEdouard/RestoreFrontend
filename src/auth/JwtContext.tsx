import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
//
import { isValidToken, setSession } from "./utils";
// import { Auth0Client } from "@auth0/auth0-spa-js";
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

interface RegisterValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
// ----------------------------------------------------------------------
// const auth0Client = new Auth0Client({
//   clientId: process.env.React_APP_GOOGLE_CLIENT_ID || "",
//   domain: "https://RacksNet-backend.onrender.com/" || "",
//   authorizationParams: {
//     redirect_uri: window.location.origin,
//   },
// });
const initialState = {
  isInitialized: false,
  isAuthenticated: true,
  user: {
    token: null,
    role: null,
  },
};

type AuthContextState = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any;
  method: string;
  apiLogin: any;
  apiRegister: any;
  logout: any;
  loadUser: any;
  apiGetVerifyCode: any;
  apiVerifyCode: any;
  apiResetPassword: any;
  apiGetGoogleUrl: any;
  googleLogin: any;
};

const reducer = (state: any, action: any) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextState | null>(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("racksnet_accessToken")
        : "";
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get("/api/auth");

        const { user } = response.data;

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN

  const loadUser = useCallback(async () => {
    const response = await axios.get("/api/auth");
    const { accessToken } = response.data;
    setSession(accessToken);
  }, []);
  const apiLogin = useCallback(
    async (data: { email: string; password: string }) => {
      const response = await axios.post("/api/auth/login", data);
      const { accessToken, user } = response.data;

      setSession(accessToken);

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    },
    []
  );

  // REGISTER
  const apiRegister = useCallback(async (data: RegisterValues) => {
    const response = await axios.post("/api/auth/register", data);
    const { accessToken, user } = response.data;

    localStorage.setItem("racksnet_accessToken", accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null as any);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const googleLogin = useCallback(async () => {
    // await auth0Client?.loginWithPopup();
    // const isAuthenticated = await auth0Client?.isAuthenticated();
    // if (isAuthenticated) {
    //   const user = await auth0Client?.getUser();
    //   console.log(user);
    // }
  }, []);
  const apiGetVerifyCode = useCallback(async function (email: string) {
    const response = await axios.get(`/api/auth/verify-email/?email=${email}`);
    return response;
  }, []);
  const apiVerifyCode = useCallback(async function (data: any) {
    const response = await axios.post(`/api/auth/verify-code/`, data);
    return response;
  }, []);

  const apiResetPassword = useCallback(async function (data: any) {
    const response = await axios.post("/api/auth/reset-password", data);
    return response;
  }, []);

  const apiGetGoogleUrl = useCallback((from: string) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const options = {
      redirect_uri:
        "https://RacksNet-backend.onrender.com/api/auth/google-login",
      client_id: process.env.React_APP_GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      state: from,
    };

    const qs = new URLSearchParams(options as any);

    return `${rootUrl}?${qs.toString()}`;
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      apiLogin,
      apiRegister,
      logout,
      loadUser,
      apiGetVerifyCode,
      apiVerifyCode,
      apiResetPassword,
      apiGetGoogleUrl,
      googleLogin,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      apiLogin,
      logout,
      apiRegister,
      loadUser,
      apiGetVerifyCode,
      apiVerifyCode,
      apiResetPassword,
      apiGetGoogleUrl,
      googleLogin,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
