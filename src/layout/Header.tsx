import Container from "../components/layout/Container";
import Wrapper from "../components/layout/Wrapper";
import myLogo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropDown from "../assets/images/icon-dropdown.svg";

function Header() {
  return (
    <Container className=" w-full md:px-10 md:py-4 ">
      <Wrapper className="flex items-center justify-between p-5">
        <div className="flex items-center justify-between">
          <img src={myLogo} alt="Logo" className="w-52 h-10 " />
        </div>
        <button className="flex items-center text-white bg-gray-500/50 h-10 w-28 md:w-36 p-3 rounded-lg hover:bg-gray-500 transition-colors duration-100 ">
          <img src={units} className="m-2" />
          <span className="text-center mr-2"> Units </span>
          <img src={dropDown} alt="dropDown" className="md:m-6" />
        </button>
      </Wrapper>
    </Container>
  );
}

export default Header;
