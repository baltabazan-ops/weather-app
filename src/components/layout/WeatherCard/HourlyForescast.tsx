import { useSelector } from "react-redux";
import Box from "../Box";
import Container from "../Container";
import Wrapper from "../Wrapper";
import type { RootState } from "../../../app/store";
import { iconWeather } from "./types";
import iconDrop from "../../../assets/images/icon-dropdown.svg";

function HourlyForescast() {
  const weatherData = useSelector(
    (state: RootState) => state.climate.searchResult,
  );

  const cityDetails = weatherData.length > 0 ? weatherData[0] : null;

  return (
    <Container className="flex items-center">
      <Wrapper className="">
        <Box className="">
          <div className=" w-80 overflow-y-auto max-h-[580px] bg-gray-500/20 rounded-xl scrollbar-h-[2px] scrollbar-none text-white">
            {cityDetails?.weatherData?.daily ? (
              <div className="flex items-center justify-between p-4 ">
                <span>Hourly Forescast</span>
                <div className="flex relative items-center justify-end">
                  <button className=" h-10 md:w-[110px] w-[110px] rounded-lg bg-gray-500/20 text-white hover:bg-gray-300/20 transition-colors duration-200 pr-4 ">
                    {cityDetails?.weatherData?.daily[0].dayComplete}
                  </button>{" "}
                  <img src={iconDrop} className="absolute m-2" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 ">
                <span>Hourly Forescast</span>
                <div className="flex relative items-center justify-end">
                  <button className=" h-10 md:w-[110px] w-[110px] rounded-lg bg-gray-500/20 text-white hover:bg-gray-300/20 transition-colors duration-200 pr-4 ">
                    {cityDetails?.weatherData?.daily[0].dayComplete}
                  </button>{" "}
                  <img src={iconDrop} className="absolute m-2" />
                </div>
              </div>
            )}
            <div className="flex flex-col items-center space-y-3  ">
              {cityDetails?.weatherData?.hourly
                ? cityDetails?.weatherData?.hourly.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-2 items-center justify-items-center h-12 w-64 bg-gray-500/20 rounded-xl "
                    >
                      <div className="flex items-center">
                        <img
                          className="h-14"
                          src={iconWeather[item.weathercode]?.icon}
                          alt={iconWeather[item.weathercode]?.label ?? "Clima"}
                        />

                        <p className="">{item.time}</p>
                      </div>
                      <p>{item.temperature}°</p>
                    </div>
                  ))
                : Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className=" h-12 w-64 bg-gray-500/20 rounded-xl"
                    ></div>
                  ))}
            </div>
          </div>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default HourlyForescast;
