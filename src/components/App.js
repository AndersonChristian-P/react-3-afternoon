import React, { Component } from 'react';
import Post from "./Post/Post"
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
      .then(res => {
        // console.log("res", res.data)
        let data = res.data
        this.setState({
          posts: data
        })
      })
      .catch(err => {
        console.log("err load data: ", err)
      })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text: text })
      .then(res => {
        let data = res.data
        this.setState({
          posts: data
        })
      })
      .catch(err => {
        console.log("err change: ", err)
      })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => {
        let data = res.data
        this.setState({
          posts: data
        })
      })
      .catch(err => {
        console.log("err delete: ", err)
      })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text: text })
      .then(res => {
        let data = res.data
        this.setState({
          posts: data
        })
      })
      .catch(err => {
        console.log("err post: ", err)
      })
  }

  render() {
    const { posts } = this.state;  // same as const posts = this.state.posts

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {
            posts.map(post =>
              <Post key={post.id} text={post.text} date={post.date} updatePostFn={this.updatePost} id={post.id} deletePostFn={this.deletePost} />
            )
          }

        </section>
      </div>
    );
  }
}

export default App;
