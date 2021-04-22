import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

declare global {
  const key: string;
  interface Window {
    key: string;
  }
}

interface Props {
  description?: string;
  lang?: string;
  meta?: HTMLMetaElement;
  title: string;
}

const SEO: FC<Props> = ({
  description = '',
  lang = 'pt',
  meta,
  title = '',
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  const fullMeta = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata.author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ];

  if (meta) fullMeta.concat(meta);

  if (window) {
    window.key = '74eaf481e67ca237033c5a2c53509d77';
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={fullMeta}
    />
  );
};

export default SEO;
