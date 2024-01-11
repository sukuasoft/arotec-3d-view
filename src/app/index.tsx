
import './../styles/app-style.css';

import box3dImage from '../assets/images/box3d.jpg';
import arrowRight from '../assets/icons/arrow-right.png';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import {useEffect, useRef, useState} from 'react';


function App() {

  const [loaded, setLoaded] = useState(false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  
  const area3D = useRef<HTMLDivElement | null>(null);



  useEffect(()=>{
      if(area3D.current != null){
        //aqui onde inica as configurações

        if(loaded){
          return;
        }

        const geometry = new THREE.BoxGeometry( 5, 5, 5 );
        const material = new THREE.MeshBasicMaterial( { color: 0xff0040 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        
        camera.position.z = 5;
 
        
 
        renderer.setSize( area3D.current.clientWidth, area3D.current.clientHeight);
        area3D.current.appendChild(renderer.domElement);

            //controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enabled = true;
      controls.minDistance = 10;
      controls.maxDistance = 10;                      


        setInterval(()=>{
           controls.update();
         //  cube.rotation.y += 2;
          renderer.render( scene, camera );
          
        }, 200);
        setLoaded(true);
      }
  }, [area3D]);
  

  return (
    <>
      <div className='app'>
        <div className='explorer-menu'>
            <div className='explorer-menu-title'>Explorar</div>
            <div className='ex-models-container'>
              <div className='ex-model ex-model-active'>
                <div className='ex-model-image'>
                <img src={box3dImage} width={60} alt="" />

                </div>
                  
                  <div className='ex-model-title'>Kit Completo</div>

              </div>
              <div className='ex-model'>
                <div className='ex-model-image'>
                <img  src={box3dImage} width={60} alt="" />

                </div>
                  <div className='ex-model-title'>Tubagem de Sondagem</div>
              </div>
            </div>
        </div>


        <div className='area'>
            <div className='area-3d' ref={area3D}></div>

            <div className='explain'>
                <img className='explain-image' height={100} src={box3dImage}  alt="" />
              
              <div className='explain-title'>Animação 1: Kit</div>
              <div className='explain-content'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita exercitationem repellendus molestiae magnam voluptas velit molestias magni sit cupiditate error reprehenderit doloribus nesciunt quidem dolor facere fugiat at, perferendis rem.
              </div>
              <div className='explain-next'>Próxima simulação
              <img  src={arrowRight} width={18} alt="" />
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
