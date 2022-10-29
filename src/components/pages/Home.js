import { BrowserRouter as Router } from "react-router-dom";
import { Component } from "react";
import "./Home.css";
import { loadPosts } from "../utils/LoadPosts";
import LinkButton from "../layout/LinkButton";
import Navbar from "../layout/Navbar";
import Container from "../layout/Container";
import { Posts } from "../posts/Posts";
import { Input } from "../layout/Input";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    //vai espalhar os posts no array (spread)
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <Router>
          <Navbar />
          <div className="title-search">
            {!!searchValue && <h2>search value: {searchValue}</h2>}
            <Input searchValue={searchValue} handleChange={this.handleChange} />
          </div>

          <Container customClass="min-height">
            {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

            {filteredPosts.length === 0 && <p>Não existem posts!</p>}

            {!searchValue && (
              <LinkButton
                className="btn-container"
                text={"Mais Posts"}
                to={this.loadMorePosts}
                disabled={noMorePosts}
              />
            )}
          </Container>
        </Router>
      </section>
    );
  }
}

export default Home;
