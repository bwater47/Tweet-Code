import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev - 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        window.open(searchData[selectedItem].link);
        // For window open in new tab use .show.url on line above.
        setSearchData([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    if (search !== "") {
      // Comment this in if you want to fetch data from API instead of using local data.
      //   fetch(`https://api.github.com/search/repositories?q=${search}`)
      //     .then((res) => res.json())
      //     .then((data) => setSearchData(data));

      const newFilterData = data.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase());
        // Comment this one in for searching in title only.
        // return book.title.includes(search);
      });
      setSearchData(newFilterData);
    } else {
      setSearchData([]);
    }
  }, [search]);
  return (
    <section className="">
      <div className="">
        <input
          type="text"
          className=""
          placeholder="Search..."
          autoComplete="off"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <div className="">
          {search === "" ? <searchIcon /> : <CloseIcon onClick={handleClose} />}
        </div>
      </div>
      <div className="">
        {searchData.slice(0, 10).map((data, index) => (
          <a
            href={data.link}
            key={index}
            target="_blank"
            className={
              selectedItem === index
                ? ""
                : ""
            }
          >
            {data.title}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SearchBar;
