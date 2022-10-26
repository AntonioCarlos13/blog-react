import { Component } from "react";
import "./Home.css";
import PostCard from "../posts/PostCard";
import { loadPosts } from "../utils/LoadPosts";

class Home extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
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
      </section>
    );
  }
}

export default Home;
