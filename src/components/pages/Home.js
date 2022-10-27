import { BrowserRouter as Router } from "react-router-dom";
import { Component } from "react";
import "./Home.css";
import PostCard from "../posts/PostCard";
import { loadPosts } from "../utils/LoadPosts";
import LinkButton from "../layout/LinkButton";
import Navbar from "../layout/Navbar";
import Container from "../layout/Container";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
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

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Router>
          <Navbar />
          <Container customClass="min-height">
            <div className="posts">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  cover={post.cover}
                />
              ))}
              {/* <div className="sidebar">
            <div>pesquisar este blog</div>
          </div> */}
            </div>
            <LinkButton
              text={"Mais Posts"}
              to={this.loadMorePosts}
              disabled={noMorePosts}
            />
          </Container>
        </Router>
      </section>
    );
  }
}

export default Home;
