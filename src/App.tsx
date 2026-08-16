import "./App.css";
import Container from "./components/layout/Container";
import CardWeather from "./components/layout/WeatherCard/CardWeather";
import DailyForescast from "./components/layout/WeatherCard/DailyForescast";
import HourlyForescast from "./components/layout/WeatherCard/HourlyForescast";
import Section from "./features/components/Section";
import Header from "./layout/Header";

function App() {
  return (
    <Container>
      <div className="w-full h-full">
        <Header />
        <Section />
        <div className="flex flex-col md:flex-row justify-center pt-2 mr-20">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <CardWeather />
            <DailyForescast />
          </div>

          <div className="lg:col-span-1 flex md:justify-end">
            <HourlyForescast />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
