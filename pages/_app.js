import '@/styles/globals.css'
import NavBar from '@/component/navbar/navbar';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <NavBar />
      <Component {...pageProps} />
    </main>
  );
}
