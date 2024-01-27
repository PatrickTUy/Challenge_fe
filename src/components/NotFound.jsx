import React from 'react';
import Button from '../components/Button';
import Image from '../assets/404.gif';

const NotFound = ({ link }) => {
  return (
    <div className="w-full h-screen flex-col ">
      <div className={` h-full flex flex-col`}>
        <div className="h-[50%]">
          <img
            src={Image}
            alt="404"
            className="md:w-[50%] h-full mx-auto w-full"
          />
        </div>
        <div className="text-primary  h-max pt-[5%] flex flex-col space-y-4 w-max justify-center mx-auto">
          <div className="text-2xl text-center">404- PAGE NOT FOUND</div>
          <div className="flex flex-col items-center justify-center w-full mx-auto text-[12px] md:text-[18px]">
            <p>Ooops!, the page you are looking for might have been removed</p>
            <p> had its name changed or is temporary unavailable</p>
          </div>
          <div className="w-full">
            <Button
              content="Go to homepage"
              type="submit"
              loading={false}
              btnColor="primary"
              style="flex items-center justify-center text-white w-[50%] ml-[25%]"
              disabled={true}
              onClick={() => {
                window.location = '/';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
