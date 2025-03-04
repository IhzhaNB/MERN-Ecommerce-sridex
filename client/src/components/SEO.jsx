import { Helmet } from "react-helmet";

const SEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | StrideX</title>
    </Helmet>
  );
};

export default SEO;
