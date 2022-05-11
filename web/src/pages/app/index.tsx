import { getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <h1>Home</h1>
      <hr />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = getSession(req, res);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/api/auth/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export const getServerSideProps = withPageAuthRequired();
