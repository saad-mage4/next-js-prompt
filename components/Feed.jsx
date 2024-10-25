"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, searchByUserName }) => {
  return (
    <>
      <div className="mt-16 w-full gap-4 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            searchByUserName={searchByUserName}
          />
        ))}
      </div>
    </>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedResult, setSearchedResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
    setSearchedResult(data);
  };

  const filterPrompts = (st) => {
    const regex = new RegExp(st, "i");
    return posts.filter((item) => regex.test(item.tag));
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    setSearchedResult(searchResult);
  };

  const searchByUserName = (e) => {
    console.log(e);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <section className="feed">
        <form className="relative w-full max-w-lg mx-auto flex-center">
          <input
            type="text"
            placeholder="Search for tag or username."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        <PromptCardList
          data={searchedResult}
          searchByUserName={searchByUserName}
          handleTagClick={handleTagClick}
        />
      </section>
    </>
  );
};

export default Feed;
