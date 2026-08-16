import { useSelector } from "react-redux";
import Box from "../Box";
import Container from "../Container";
import Wrapper from "../Wrapper";
import type { RootState } from "../../../app/store";
import { iconWeather, type infoWeather } from "./types";
import Today from "../../../assets/images/bg-today-large.svg";

function CardWeather() {
  const weatherData = useSelector(
    (state: RootState) => state.climate.searchResult,
  );

  const cityDetails = weatherData.length > 0 ? weatherData[0] : null;

  const codeNumber = cityDetails?.weatherData?.weathercode;

  const weatherInfo: infoWeather | null =
    codeNumber !== undefined ? iconWeather[codeNumber] : null;

  return (
    <Container className="flex  lg:flex-row flex-col items-center gap-6 md:max-w-[1440px] w-full mx-auto p-6">
      <Wrapper className=" w-full ">
        <Box className="flex justify-center flex-col lg:flex-row gap-6 w-full">
          <div className="flex justify-center">
            {cityDetails?.weatherData?.daily ? (
              <div className="flex items-center gap-2 text-white">
                <div className="flex items-center ml-2 ">
                  <img
                    src={Today}
                    alt="Today"
                    className="w-[330px]  md:w-[730px]"
                  />
                </div>

                <div className=" flex flex-col md:flex-col absolute m-2 md:m-4">
                  <h1 className="m-2 text-xl md:text-4xl">
                    {cityDetails?.name}
                  </h1>
                  <p className="md:text-2xl text-xl m-2">
                    {cityDetails?.weatherData?.daily[0].year}
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  {weatherInfo?.icon && (
                    <div className="flex absolute items-center m-2 md:m-4">
                      <img
                        className="h-24 md:mr-8 "
                        src={weatherInfo.icon}
                        alt={weatherInfo.label}
                      ></img>
                      <p className="md:text-5xl text-2xl m-1 md:m-2 font-bold">
                        {cityDetails.weatherData.temperature}°
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center ">
                {" "}
                <img
                  src={Today}
                  alt="Today"
                  className="w-[330px] md:w-[730px]"
                />
              </div>
            )}
          </div>
        </Box>
        <Box className=" text-white mt-8 flex justify-center  ">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-12">
            <div className="w- h-20 bg-gray-400/20 rounded-md flex flex-col gap-3 ">
              <p className="pl-4 mt-2">Feels Like</p>
              <p className=" pl-4 text-xl">
                {cityDetails?.weatherData?.temperature ?? "--"} C°
              </p>
            </div>
            <div className="w-36 h-20 bg-gray-400/20 rounded-md flex flex-col gap-3 ">
              <p className="pl-4 mt-2">Humidity</p>
              <p className=" pl-4 text-xl">
                {cityDetails?.weatherData?.humidity ?? "--"} %
              </p>
            </div>
            <div className="w-36 h-20 bg-gray-400/20 rounded-md flex flex-col gap-3 ">
              <p className="pl-4 mt-2">Windspeed</p>
              <p className=" pl-4 text-xl">
                {cityDetails?.weatherData?.windspeed ?? "--"} km/h
              </p>
            </div>
            <div className="w-36 h-20 bg-gray-400/20 rounded-md flex flex-col gap-3 ">
              <p className="pl-4 mt-2">Precipitation</p>
              <p className=" pl-4 text-xl">
                {cityDetails?.weatherData?.precipitation ?? "--"} mm
              </p>
            </div>
          </div>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default CardWeather;
