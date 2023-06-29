"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

/**
 * PromptCardList component
 * @param {Object} props
 * @param {Array} props.data - An array of post data
 * @param {Function} props.handleTagClick - Function to handle click events on tags
 * @returns JSX.Element
 */
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

/**
 * Feed component - a main page component responsible for fetching and displaying posts,
 * as well as handling search and tag click events.
 * @returns JSX.Element
 */
const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  /**
   * Filters posts based on a search text
   * @param {string} searchText - Text to search for in post creator username, tag, and prompt
   * @returns {Array} Filtered array of posts
   */
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  /**
   * Handles changes in the search input.
   * It applies a debounce method to the search.
   * @param {Object} e - Event object
   */
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  /**
   * Handles click events on tags.
   * It sets the search text to the clicked tag and displays the search results.
   * @param {string} tagName - The name of the clicked tag
   */
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
