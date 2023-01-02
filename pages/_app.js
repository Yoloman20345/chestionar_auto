import App from "next/app";
import cookie from "cookie";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      // Parse the cookies from the request header
      const cookies = cookie.parse(ctx.req.headers.cookie || "");

      // Get the user ID from the cookie
      const userId = cookies.userId;

      // Set the user ID as a prop
      pageProps.userId = userId;

      // Call the getInitialProps function of the component
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default MyApp;
