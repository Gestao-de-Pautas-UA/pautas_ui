import '@/styles/globals.css'
import NavBar from '@/component/navbar/navbar';

export default function App({ Component, pageProps }) {
  return <>
    <NavBar />
    <Component {...pageProps} />
  </>
}
