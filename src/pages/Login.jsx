import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEyeOff } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import StyledInput from '../components/StyledInput';
import Button from '../components/Button';
import axios from 'axios';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitterX } from 'react-icons/bs';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { ToastComponent, ToasterComponent } from '../components/Toast';

import { APP } from '../utils/constant.js';

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSocialLogin = () => {
    console.log('Social login');
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const notify = (type, message) => {
    ToastComponent({
      message: message,
      type: type,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await axios
      .post(APP.API_MAIN_URL + '/users/login', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((res) => {
        console.log(res, 'this is the response');
        reset();
        localStorage.setItem('userToken', res.data.accessToken);
        localStorage.setItem('first_name', res.data.first_name);
        navigate('/home');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, 'error');
        notify(
          'error',
          err?.response?.data?.message || 'invalid credentials, try again!'
        );
        setLoading(false);
      });
  };

  const onKeyEnter = async () => {
    setLoading(true);
    await axios
      .post(APP.API_MAIN_URL + '/users/login', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((res) => {
        reset();
        localStorage.setItem('userToken', JSON.stringify(res.data.accessToken));
        localStorage.setItem('first_name', res.data.first_name);
        setLoading(false);
        navigate('/home');
      })
      .catch((err) => {
        console.log(err, 'error');
        notify(
          'error',
          err?.response?.data?.message || 'invalid credentials, try again!'
        );
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center bg-white w-full h-full">
      <ToasterComponent />
      {loader ? (
        'Loading...'
      ) : (
        <div
          id="m-auto"
          className="flex flex-col bg-white w-full md:w-[500px] min-h-3/4 rounded-lg p-4 pb-8 shadow-2xl m-auto"
        >
          <div className="flex flex-col w-4/5 max-w-[400px] mx-auto">
            <h1 className="font-bold text-fontBlack  text-center text-xl">
              {' '}
              Welcome Back!
            </h1>
            <h2 className=" text-fontBlack  text-center text-lg">
              Signin to your account
            </h2>
            <h2 className=" text-fontBlack text-base text-center cursor-pointer">
              or
              <Link to="/register" className=" ml-1">
                <u>register</u>
              </Link>
            </h2>
            <form
              className="flex flex-col w-full max-h-2/4 mt-4"
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevents the default form submission
                  onKeyEnter();
                }
              }}
            >
              <Input
                labelText={'Email'}
                labelFor={'email'}
                name={'email'}
                type={'text'}
                isRequired={true}
                placeholder={'email address'}
                customClass="w-full mb-2"
                onChange={(e) => {
                  e.target.value.length > 0
                    ? errors.email && delete errors.email
                    : (errors.email = { message: 'Email is required' });
                  setData({ ...data, email: e.target.value });
                }}
                register={register}
                errors={errors}
              />

              <StyledInput
                labelText={'Password'}
                labelFor={'password'}
                name={'password'}
                type={passwordShown ? 'text' : 'password'}
                isRequired={true}
                placeholder={'password'}
                customClass="w-full"
                onChange={(e) => {
                  e.target.value.length > 0
                    ? errors.password && delete errors.password
                    : (errors.password = { message: 'Password is required' });
                  setData({ ...data, password: e.target.value });
                }}
                register={register}
                errors={errors}
                content={
                  <div className="cursor-pointer mt-[2px]">
                    {passwordShown ? (
                      <FaRegEye color="#767676" onClick={togglePassword} />
                    ) : (
                      <FiEyeOff color="#767676" onClick={togglePassword} />
                    )}
                  </div>
                }
              />

              <div className="flex justify-between items-center w-full mt-4">
                <div className="flex m-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="border border-black"
                    {...register('rememberMe', {})}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="font-nunito font-normal ml-2 self-center text-xs md:text-sm"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="underline underline-offset-2 text-xs md:text-sm"
                >
                  {' '}
                  Forgot Password?
                </Link>
              </div>
              <Button
                content="Submit"
                type="submit"
                loading={loading}
                btnColor="primary"
                style="text-white w-full h-[40px] mt-4"
                disabled={loading}
              />
            </form>
            <div className=" w-full flex justify-between items-center my-6">
              <div className="w-1/4 md:w-1/3 h-[1px] bg-light"></div>
              <h2 className=" text-xs md:text-sm px-4 text-fontBlack ">
                or Log in with
              </h2>
              <div className="w-1/4 md:w-1/3 h-[1px] bg-light"></div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
                onClick={() => {
                  handleSocialLogin();
                }}
              >
                <AiFillGoogleCircle size={30} className="object-contain" />
              </div>

              <div
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
                onClick={() => {
                  handleSocialLogin();
                }}
              >
                <BsFacebook size={27} className="object-contain" />
              </div>

              <div
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
                onClick={() => {
                  handleSocialLogin();
                }}
              >
                <BsTwitterX size={25} className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
