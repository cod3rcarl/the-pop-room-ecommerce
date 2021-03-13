import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to the Pop Room',
  description: 'A collection of pop vonyls and other pop culture toys/figures',
  keywords: 'toys, figures, pop vinyl, marvel',
};
export default Meta;
