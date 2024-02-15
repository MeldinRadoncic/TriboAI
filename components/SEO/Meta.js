function Meta(props) {
  const {
    title = "TriboAI | AI-Powered Creative Toolkit",
    description = "Create images, videos, text, music, and code effortlessly with TriboAI. Start your creative journey today for FREE.",
    url = "https://www.triboai.com",
    keywords = [
      "TriboAI",
      "creative toolkit",
      "AI-generated content",
      "image",
      "code",
      "video",
      "conversation",
      "generate text",
      "generate audio",
      "generate video",
      "artificial intelligence",
      "generate code",
      "creative app",
      "creative software",
      "creative tools",
      "GPT-4",
      'Chatbot',
      "AI",
      "AI-generated",
      "Image generation",
      "Chatbot GPT-4",
      "chatgpt-4",
      
    ],
    icon = "./images/favicon.ico",
    author = "App Wizard",
    ogTitle = "TriboAI | AI-Powered Creative Toolkit",
    ogDescription = "Create images, videos, text, music, and code effortlessly with TriboAI. Start your creative journey today for FREE.",
    ogImage = "/images/logo-transparent.png",
    ogUrl = "https://www.triboai.com",
    ogType = "website",
    ogArticleAuthor = "App Wizard",
  } = props;

  return (
    <>
      <meta
        name='organization'
        content='App Wizard'
      />
      <title>{title}</title>
      <meta
        name='description'
        content={description}
      />
      <meta name='url' content={url} />
      <meta
        name='keywords'
        content={keywords.join(",")}
      />
      <meta
        name='author'
        content={author}
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      />
      <link rel='icon' href={icon} />

      {/* Open Graph (OG) meta tags */}
      <meta
        property='og:title'
        content={ogTitle}
      />
      <meta
        property='og:description'
        content={ogDescription}
      />
      <meta
        property='og:image'
        content={ogImage}
      />
      <meta
        property='og:url'
        content={ogUrl}
      />
      <meta
        property='og:type'
        content={ogType}
      />

      {/* Twitter meta tags */}
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content={ogTitle}
      />
      <meta
        name='twitter:description'
        content={ogDescription}
      />
      <meta
        name='twitter:image'
        content={ogImage}
      />
      <meta
        name='twitter:url'
        content={ogUrl}
      />
      <meta
        name='twitter:creator'
        content={ogArticleAuthor}
      />
      <meta
        name='twitter:image:alt'
        content={ogTitle}
      />
    </>
  );
}

export default Meta;
