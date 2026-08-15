import { useAppDispatch } from "../../app/hook";
import Box from "../../components/layout/Box";
import Container from "../../components/layout/Container";
import Wrapper from "../../components/layout/Wrapper";
import iconSearch from "../../assets/images/icon-search.svg";
import { useState } from "react";
import { fetchSearch } from "../climateslice";

function Section() {
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      dispatch(fetchSearch(search));
    } else {
      console.log("el query estaba vacio");
    }
  };

  return (
    <Container className="flex items-center flex-col gap-12 p-4">
      <h1 className="font-bold text-5xl text-center text-white">
        How´s the sky looking today?
      </h1>

      <Wrapper className=" flex items-center justify-center">
        <Box className="">
          <form
            className="flex flex-col md:flex-row items-center gap-6"
            onSubmit={handleSearch}
          >
            <div className="flex items-center">
              <img src={iconSearch} className="p-4 absolute md:mr-[270px]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-[320px] md:w-[440px] rounded-lg bg-gray-400/20 text-center"
                type="text"
                placeholder="Search for a place..."
              />
            </div>
            <button
              onClick={handleSearch}
              className=" w-full px-5 h-10 md:w-[90px] rounded-lg bg-blue-500/80 text-white hover:bg-blue-300 transition-colors duration-200 "
            >
              Search
            </button>
          </form>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default Section;
