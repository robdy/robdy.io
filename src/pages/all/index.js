import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <link rel="canonical" href="https://robdy.io/all/" />
        </Helmet>
        <div className="container">
          <h1 className="page-header">All posts</h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
