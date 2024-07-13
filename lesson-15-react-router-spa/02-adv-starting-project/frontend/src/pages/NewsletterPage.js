import React from "react";
import PageContent from "../components/PageContent";
import NewsletterSignup from "../components/NewsletterSignup";

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  /* eslint-disable */
  const email = data.get("email");
  
  //console.log(email);
  return { message: "Signup successfully" };
}
