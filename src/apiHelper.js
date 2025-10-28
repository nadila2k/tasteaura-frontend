import axios from "axios";
import toast from "react-hot-toast";
import { clearToken, getToken } from "./features/auth/token";
import { hideSpinner, showSpinner } from "./components/GlobalSpinner";

const api = axios.create({
  baseURL: "https://tasteaura-backend-t7xi.onrender.com/api/v1/",
  timeout: 10000,
});


// ✅ Request Interceptor
api.interceptors.request.use((config) => {
  showSpinner();
  const authFlag = config.custom?.auth ?? true; 
  if (authFlag) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => {
     hideSpinner();
    const res = response.data;
    const notify = response.config.custom?.notify ?? true;

    if (res && res.responseStatus) {
      switch (res.responseStatus) {
        case "SUCCESS":
          if (notify && res.message) {
            toast.success(res.message);
          }
          return res.data || res;

        case "FAILED":
          if (notify && res.message) {
            toast.error(res.message || "Operation failed");
          }
          return Promise.reject(res);

        case "ERROR":
          if (notify && res.message) {
            toast.error(res.message || "An error occurred");
          }
          return Promise.reject(res);

        default:
          return res;
      }
    }

    return res;
  },
  (error) => {
    hideSpinner();
    const notify = error.config?.custom?.notify ?? true;
    if (notify) {
      handleError(error);
    }
    return Promise.reject(error);
  }
);

// ✅ API helper
const apiHelper = {
  get: async (url, params = {}, options = {}) => {
    const { auth, notify, ...restOptions } = options;
    return api.get(url, { 
      params, 
      custom: { auth, notify },
      ...restOptions 
    });
  },

  post: async (url, data = {}, options = {}) => {
    const { auth, notify, isMultipart, ...restOptions } = options;
    return api.post(url, data, {
      headers: detectHeaders(data, isMultipart),
      custom: { auth, notify },
      ...restOptions,
    });
  },

  put: async (url, data = {}, options = {}) => {
    const { auth, notify, isMultipart, ...restOptions } = options;
    return api.put(url, data, {
      headers: detectHeaders(data, isMultipart),
      custom: { auth, notify },
      ...restOptions,
    });
  },

  delete: async (url, options = {}) => {
    const { auth, notify, ...restOptions } = options;
    return api.delete(url, {
      custom: { auth, notify },
      ...restOptions
    });
  },
};

// ✅ Detect form-data
function detectHeaders(data, isMultipart) {
  if (isMultipart || data instanceof FormData) {
    return { "Content-Type": "multipart/form-data" };
  }
  return { "Content-Type": "application/json" };
}

function handleError(error) {
  if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error.request) {
    toast.error("Network error: Unable to reach server");
  } else {
    toast.error("An unexpected error occurred");
  }
}

export default apiHelper;