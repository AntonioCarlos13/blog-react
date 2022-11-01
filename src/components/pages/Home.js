import { BrowserRouter as Router } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "./Home.css";
import { loadPosts } from "../utils/LoadPosts";
import { LinkButton } from "../layout/LinkButton";
import Navbar from "../layout/Navbar";
import Container from "../layout/Container";
import { Posts } from "../posts/Posts";
import { Input } from "../layout/Input";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    // console.log(new Date().toLocaleString('pt-BR'));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <section>
      <Router>
        <Navbar />
        <Container>
          <div className="main_body">
            {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

            {filteredPosts.length === 0 && <p>Não existem posts!</p>}

            {!searchValue && (
              <LinkButton
                className="btn-container"
                text={"Mais Posts"}
                onClick={loadMorePosts}
                disabled={noMorePosts}
              />
            )}
          </div>

          <div className="right_sidebar">
            <div>
              {/* {!!searchValue && <h2>search value: {searchValue}</h2>} */}
              <Input searchValue={searchValue} handleChange={handleChange} />
            </div>
            <div className="sidebar-title">Rede Sociais</div>
            <ul className="social_list">
              <li id="fac">
                <FaFacebook />
              </li>
              <li id="twi">
                <FaTwitter />
              </li>
              <li id="ins">
                <FaInstagram />
              </li>
              <li id="lin">
                <FaLinkedin />
              </li>
              <li id="you">
                <FaYoutube />
              </li>
            </ul>
            <div className="sidebar-title">Marcadores</div>
            <div className="sidebar-title">Postagens Recentes</div>
            <div className="sidebar-title">Postagens Mais Visitadas</div>
          </div>
        </Container>
      </Router>
    </section>
  );
};
