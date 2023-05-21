import '@/styles/globals.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import NavBar from '@/component/navbar/navbar';
import { Roboto } from 'next/font/google';
import '../i18n/i18n'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>{`
        body, html {
          color: #292929;
        }
      `}</style>
    </main>
  );
}
