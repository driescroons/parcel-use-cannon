import React, { FC, useState } from "react";
import { Canvas, useFrame } from 'react-three-fiber';
import { Physics, useBox } from "@react-three/cannon";

function Box(props: any) {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const [ref, api] = useBox(() => ({
    ...props,
    args: [1, 1, 1],
    mass: 1
  }));
  
  useFrame(() => {
    const [x, y, z] = ref.current!.rotation.toArray();
    api.rotation.set(x + 0.1, y, z);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'blue' : 'orange'} />
    </mesh>
  );
}


const App: FC = props => {
  return (
    <Canvas>
      <Physics gravity={[0, 0, 0]}>
        <ambientLight/>
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Physics>
    </Canvas>
  );
};

export default App;
