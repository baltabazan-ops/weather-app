import { useSelector } from "react-redux";
import Box from "../Box";
import Container from "../Container";
import type { RootState } from "../../../app/store";
import { iconWeather, type infoWeather } from "./types";

function DailyForescast() {
  const weatherData = useSelector(
    (state: RootState) => state.climate.searchResult,
  );

  const cityDetails = weatherData.length > 0 ? weatherData[0] : null;

  const codeNumber = cityDetails?.weatherData?.weathercode;

  const weatherInfo: infoWeather | null =
    codeNumber !== undefined ? iconWeather[codeNumber] : null;

  return (
    <Container className="flex justify-center md:justify-center relative  ">
      <Box>
        <div className="flex justify-start">
          <span className="text-white "> Daily Forescast </span>
        </div>
        <div className=" grid grid-cols-3 md:grid-cols-7 pt-6 gap-5 md:gap-2 text-white ">
          {cityDetails?.weatherData?.daily
            ? cityDetails?.weatherData?.daily.map((item, index) => (
                <div
                  className="h-36 w-24 bg-gray-400/20 rounded-xl text-center p-2"
                  key={index}
                >
                  <p> {item.day}</p>
                  <div className="flex justify-center items-center p-2">
                    {weatherInfo?.icon && (
                      <img
                        className="h-14"
                        src={iconWeather[item.weathercode]?.icon}
                        alt={iconWeather[item.weathercode]?.label}
                      ></img>
                    )}
                  </div>
                  <div className="flex justify-between text-sm m-1">
                    <p>{item.tempMax}°</p>
                    <p>{item.tempMin}°</p>
                  </div>
                </div>
              ))
            : Array.from({ length: 7 }).map((_, index) => (
                <div className="flex" key={index}>
                  <div className="h-36 w-24 bg-gray-400/20 rounded-xl text-center">
                    <p>--</p>
                    <p></p>
                  </div>
                </div>
              ))}
        </div>
      </Box>
    </Container>
  );
}

export default DailyForescast;
