//usare el hook useeffect
import { useEffect } from "react"
/*usare varios objetos de three.js; la escena, el render y la camara de perspectiva, y  usare otros tres objetos que corresponden al cubo
y ahora importare la geometria de la esfera, las texturas, lado reverso de la esfera y un material para agregarle la textura
e importare la DirectionalLight que imita la luz del sol y las otras dos luces son mas generales*/
import {
  Scene,
  WebGL1Renderer,
  PerspectiveCamera,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  SphereGeometry,
  TextureLoader,
  BackSide, 
  MeshPhongMaterial,
  DirectionalLight,
  HemisphereLight, 
  AmbientLight
} from "three"

//aqui se mostrara  un texto que dice hola mundo
// el useEffect recibira como parametro una funcion y un array vacio
//creare una nueva escena
/*creare un nuevo render que recibe parametros el antialias evita que se vea pixelado y en el canvas sera el contenedor 
que mostrara las escenas*/
/*y por ultimo creare mi camara de perspectiva el primer para metro es 50 y el segundo hace referencia al aspect ratio 
que lo sacare del ancho de pantalla y el tercer parametro hace referencia a que tan cerca vere la camara o que tan lejos
simplemente instancie los objetos pero no los he utilizado todavia*/

function HomePage() {
  useEffect(() => {
    const scene = new Scene()
    const renderer = new WebGL1Renderer({
      antialias: true,
      canvas: document.getElementById("bg"),
    })
    const camara = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    //para visualizar el cubo tengo que mover la camara hacia atras
    camara.position.z = 8

    //creare la geometria atraves de BoxGeometry que recibe como parametros el alto, el ancho y la profundidad
    const geometria = new BoxGeometry(1, 1, 1)
    /*y luego creare el material especial que no necesita una luz para poder verse porque yo no he credo ni una luz
    y recibe como parametro un color*/
    const material = new MeshBasicMaterial({ color: 0xffffff })
    console.log(0xffffff)
    // y ahora creare el cubo atraves del mesh que recibe la geometria y el material
    const cubo = new Mesh(geometria, material)

    //para poder visualizar el cubo le dire a la escena que quiero ver el cubo
    scene.add(cubo)

    //crear skybox
    /*primero que nada creare la geometria el primer parametro es que tan grande sera y luego el numero de <segmento></segmento>
    y por ultimo el tamaño del segmento*/
    const Skygeometry = new SphereGeometry(360, 25, 25)
    //creare un cargador con la textura
    const loader = new TextureLoader()
    //ahora creare la textura que me mostrara una imagen en forma de textura
    const textura = loader.load("/custom-sky.png")
    // y ahora le asignare el material que llamara a la textura
    const material2 = new MeshPhongMaterial({
      map: textura
    })
    //y ahora para crear el skybox al mesh le pasare la geometria y el material
    const skybox = new Mesh(Skygeometry, material2)
    //lo implementare en la escena
    scene.add(skybox)
    // y sobre todo que se vea del lado reverso
    skybox.material.side = BackSide

    /*crear iluminacion  en el primer parametro colocare el color de la luz y en el segundo parametro la intensidad 
    y ahora si se mostrara la textura de la imagen*/
    scene.add(new AmbientLight(0xffffff, 0.8))

    //le agregare las medidas al render para estirar la pantalla del contenedor el ancho y el alto
    renderer.setSize(window.innerWidth, window.innerHeight)

    /*creare una funcion donde usare el renderizador que tendra un metodo que recibira dos parametros
     el primero sera la escena y el segundo la camara*
     la funcion requestAnimationFrame avisara al navegador si quiero realizar una animacion 
     y por ultimo llamare a mi funcion animate*/
    function animate() {
      //hacer que se mueva el cubo horizontalmente y verticalmente
      cubo.rotation.x += 0.01
      cubo.rotation.y += 0.01

      renderer.render(scene, camara)
      requestAnimationFrame(animate)
    }
    animate()
  }, [])
  //aqui se mostrara  un texto que dice hola mundo
  return <canvas id="bg" />;
}

export default HomePage
