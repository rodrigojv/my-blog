import matter from "gray-matter";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Container from "../components/Container";
import { Heading, Text, Box, Stack } from "@chakra-ui/core";

const Index = ({ posts, title }) => {
  return (
    <Layout pageTitle={`${title} | Blog`}>
      <header>
        <Container textAlign="center">
          <Stack spacing={6}>
            <Heading>Blog</Heading>
            <Text fontWeight="medium" fontSize="lg">
              Words and thoughts about software development, productivity and
              other wholesome topics
            </Text>
            <Text>
              🚧This blog is under construction. Stay tuned for more useful
              content soon.
            </Text>
          </Stack>
        </Container>
      </header>
      <Box as="section" mt={8}>
        <Container>
          <PostList posts={posts} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });
    return data;
  })(require.context("../posts", true, /\.md$/));

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
