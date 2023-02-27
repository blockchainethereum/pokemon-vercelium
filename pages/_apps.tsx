//importare estos estilos css
import "../styles/main.css"


//esta funcion llamada MyApp inicializa mis paginas y me servira para importar estilos de css
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }