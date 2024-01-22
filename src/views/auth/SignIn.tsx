import React, { useEffect, useState } from "react";
import InputField from "components/fields/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url, encryptObject, handle500Error, toastCss } from "variables/helper";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone) && phone.length === 10;
  };

  useEffect(() => {
    document.body.classList.remove("dark");
  }, [])

  const handleUserLogin = async () => {

    try {
      if (!validatePhone(phone) || !password) {
        toast.info('Please fill the values Right', toastCss);
        return;
      } else {
        setIsLoadingGlobal(true);
        axios
          .post(backend_url + 'auth/login', {
            phone,
            password
          })
          .then(async ({ data }) => {
            setIsLoadingGlobal(false);
            if (data.message) {
              if (!data.success) {
                toast.info(data.message, toastCss);
                return;
              }
            }
            console.log(data);

            if (data.user && data.user.role === 1) {
              localStorage.setItem('user', JSON.stringify(data.token));
              localStorage.setItem('userData', await encryptObject(data.user.email))
              console.log("login");

              navigate("/admin")
            } else if (data.user && data.user.role === 0) {
              toast.info("You are not an admin!!", toastCss);
            }
          })
          .catch((e) => {
            handle500Error(e.message)
          }).finally(() => setIsLoadingGlobal(false))
      }
    } catch (error) {
      setIsLoadingGlobal(false); // Stop global loader
      console.error('Error handling user login:', error);
    }
  };
  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Login
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to Login!
        </p>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Phone*"
          placeholder="Ex:987654321"
          id="phone"
          type="tel"
          onChange={(ev) =>
            setPhone(ev.target.value)
          }
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          onChange={(ev) =>
            setPassword(ev.target.value)
          }
        />
        <button
          disabled={isLoadingGlobal}
          onClick={() => {
            handleUserLogin()
          }}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {isLoadingGlobal ? "Loading" : "Login"}
        </button>
      </div>
    </div>
  );
}
