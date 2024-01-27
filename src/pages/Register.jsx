import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/Input';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitterX } from 'react-icons/bs';
import { AiFillGoogleCircle } from 'react-icons/ai';

import { ToastComponent, ToasterComponent } from '../components/Toast';

import { APP } from '../utils/constant';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    document.getElementById('myForm').reset();
  };

  const notify = (type, message) => {
    ToastComponent({
      message: message,
      type: type,
    });
  };

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios
        .post(APP.API_MAIN_URL + '/users/register', data, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setLoading(false);
          navigate('/');
          reset();
        })
        .catch((error) => {
          notify('error', error.response.data.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialLogin = () => {
    console.log('Social login');
  };

  return (
    <div className="flex flex-col justify-center items-center font-nunito bg-secondary h-full w-full rounded-lg ">
      <div className="flex flex-col  w-full md:w-[500px] min-h-3/4 rounded-lg p-4  shadow-2xl lg:m-auto">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="text-xl leading-[24px] text-footerColor font-bold font-nunito flex justify-center">
                Register your account
              </p>
              <div className="flex flex-row justify-center items-center w-full space-x-2">
                <p>or</p>
                <Link to="/" className=" ml-1">
                  {' '}
                  <u>login</u>
                </Link>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[300px] px-6  md:w-[448px] self-center"
          >
            <Input
              key="01"
              labelText={'First name'}
              labelFor={'first_name'}
              id="01"
              name={'first_name'}
              type={'text'}
              placeholder={'Enter your first name'}
              customClass="w-full mb-2"
              isRequired={true}
              onChange={(e) => {
                setData({ ...data, first_name: e.target.value });
              }}
              register={register}
              errors={errors}
            />

            <Input
              key="02"
              labelText={'Last name'}
              labelFor={'last_name'}
              id="02"
              name={'last_name'}
              type={'text'}
              placeholder={'Enter your last name'}
              customClass="w-full mb-2"
              isRequired={true}
              onChange={(e) => {
                setData({ ...data, last_name: e.target.value });
              }}
              register={register}
              errors={errors}
            />

            <Input
              key="03"
              labelText={'Email'}
              labelFor={'email'}
              id="03"
              name={'email'}
              type={'text'}
              placeholder={'Enter email address'}
              customClass="w-full mb-2"
              isRequired={true}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              register={register}
              errors={errors}
            />

            <Input
              key="04"
              labelText={'Password'}
              labelFor={'password'}
              id="04"
              name={'password'}
              type={'password'}
              placeholder={'Enter password'}
              customClass="w-full mb-2"
              isRequired={true}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              register={register}
              errors={errors}
            />

            <div className="flex justify-start items-center mb-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="border border-black"
              />
              <label
                htmlFor="rememberMe"
                className="font-nunito font-normal ml-2 self-center"
              >
                remember me
              </label>
            </div>
            <Button
              content="Create account"
              type="submit"
              loading={loading}
              btnColor="primary"
              style="text-white w-full  mr-4 ml-0"
              disabled={true}
            />
            <div className=" w-full flex justify-between items-center my-6">
              <div className="w-1/4 md:w-1/3 h-[1px] bg-light"></div>
              <h2 className=" text-xs md:text-sm px-4 text-fontBlack ">
                or register with
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
          </form>
        </div>
      </div>
      <ToasterComponent />
    </div>
  );
};

export default Register;
