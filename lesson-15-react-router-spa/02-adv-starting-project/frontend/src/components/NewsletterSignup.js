import classes from "./MainNavigation.module.css";
import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";

function NewsletterSignup() {
  const fetcher = useFetcher(); //===>useFetcher hook, is basically the tool you should use if you wanna interact
  // with some action or a loader without transitioning.
  // So if you wanna send your requests behind the scenes, so to say, without triggering any route changes
  //useFetcher return  an object

  const { data, state } = fetcher;

  useEffect(() => {
    if (data && data.message && state === "idle") {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      action="/newsletter"
      method="post"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="sign up for newsletter .."
        aria-label="Sign up for newsletter"
      />

      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
