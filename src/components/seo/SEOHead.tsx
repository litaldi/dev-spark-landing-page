
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead = ({
  title = 'DevAI Learning Platform - AI-Powered Programming Education',
  description = 'Master programming with AI-powered personalized learning, real-time code reviews, and interactive coding challenges. Join thousands of developers improving their skills.',
  keywords = 'programming, coding, AI learning, web development, JavaScript, React, Python, code review, developer education',
  image = '/og-image.jpg',
  url = 'https://devai-learning.com',
  type = 'website',
  author = 'DevAI Learning Team',
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const fullTitle = title.includes('DevAI') ? title : `${title} | DevAI Learning Platform`;
  const fullUrl = url.startsWith('http') ? url : `https://devai-learning.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://devai-learning.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="DevAI Learning Platform" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@devailearning" />
      <meta name="twitter:creator" content="@devailearning" />
      
      {/* Article specific tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Additional SEO tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-navbutton-color" content="#3B82F6" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data for Education */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "DevAI Learning Platform",
          "description": description,
          "url": fullUrl,
          "logo": `${fullUrl}/logo.png`,
          "sameAs": [
            "https://twitter.com/devailearning",
            "https://github.com/devai-learning",
            "https://linkedin.com/company/devai-learning"
          ],
          "courseMode": "online",
          "educationalLevel": "beginner to advanced",
          "subject": "Computer Programming"
        })}
      </script>
    </Helmet>
  );
};
