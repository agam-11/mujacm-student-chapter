import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeGlobe({ isDark = true }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const starsRef = useRef(null);
  const raysRef = useRef(null);
  const rocketsRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);

  // Color scheme based on theme
  const getColors = (dark) => dark
    ? {
        bg: 0x110053,
        globe: 0x1f00a9,
        star: 0xd4d4d4,
        ray: 0x00ffff,
        rocketBody: 0xff6600,
        rocketFlame: 0xffaa00,
      }
    : {
        bg: 0xf5f5f5,
        globe: 0x6666cc,
        star: 0x333333,
        ray: 0x0066cc,
        rocketBody: 0xff6600,
        rocketFlame: 0xffaa00,
      };

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("ThreeGlobe: Initializing with theme:", isDark ? "dark" : "light");

    const colors = getColors(isDark);

    // Responsive scaling based on viewport
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const globeScale = isMobile ? 0.6 : isTablet ? 0.8 : 1.0;
    const cameraDistance = isMobile ? 3 : isTablet ? 2.5 : 2;
    const starCount = isMobile ? 500 : isTablet ? 1000 : 1500;
    const rayCount = isMobile ? 6 : isTablet ? 9 : 12;
    const rocketCount = isMobile ? 1 : isTablet ? 2 : 3;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = cameraDistance;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(colors.bg, 1);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'auto';
    
    // Clear previous renderer if exists
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    console.log("ThreeGlobe: Renderer created and added to DOM");

    // Create globe (wireframe sphere)
    const geometry = new THREE.SphereGeometry(1.15 * globeScale, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: colors.globe,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Add stars/particles
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
      
      velocities[i] = (Math.random() - 0.5) * 0.003;
      velocities[i + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i + 2] = (Math.random() - 0.5) * 0.003;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: colors.star,
      size: 0.03,
      transparent: true,
      opacity: 0.9,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = { geometry: starGeometry, material: starMaterial, stars, positions, velocities };

    // Create rays emanating from globe
    const rays = [];
    const rayGroup = new THREE.Group();
    scene.add(rayGroup);

    for (let i = 0; i < rayCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      const rayLength = 0.175 * globeScale;
      const globeRadius = 1.15 * globeScale;
      const startX = Math.sin(theta) * Math.cos(phi) * globeRadius;
      const startY = Math.sin(theta) * Math.sin(phi) * globeRadius;
      const startZ = Math.cos(theta) * globeRadius;
      
      const endX = Math.sin(theta) * Math.cos(phi) * (globeRadius + rayLength);
      const endY = Math.sin(theta) * Math.sin(phi) * (globeRadius + rayLength);
      const endZ = Math.cos(theta) * (globeRadius + rayLength);

      const rayGeometry = new THREE.BufferGeometry();
      const rayPositions = new Float32Array([
        startX, startY, startZ,
        endX, endY, endZ,
      ]);
      rayGeometry.setAttribute('position', new THREE.BufferAttribute(rayPositions, 3));
      
      const rayMaterial = new THREE.LineBasicMaterial({
        color: colors.ray,
        transparent: true,
        opacity: 0.6,
        linewidth: 1,
      });
      const rayLine = new THREE.Line(rayGeometry, rayMaterial);
      rayGroup.add(rayLine);
      
      rays.push({
        line: rayLine,
        phi,
        theta,
        geometry: rayGeometry,
      });
    }
    raysRef.current = { rayGroup, rays };

    // Create random rockets/UFOs
    const rockets = [];

    const createRocket = () => {
      const startX = (Math.random() - 0.5) * 20;
      const startY = (Math.random() - 0.5) * 20;
      const startZ = (Math.random() - 0.5) * 20;

      const velX = (Math.random() - 0.5) * 0.015;
      const velY = (Math.random() - 0.5) * 0.015;
      const velZ = (Math.random() - 0.5) * 0.015;

      const rocketGroup = new THREE.Group();

      const coneGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
      const rocketMaterial = new THREE.MeshBasicMaterial({ color: colors.rocketBody });
      const cone = new THREE.Mesh(coneGeometry, rocketMaterial);
      rocketGroup.add(cone);

      const flameGeometry = new THREE.ConeGeometry(0.04, 0.1, 8);
      const flameMaterial = new THREE.MeshBasicMaterial({ color: colors.rocketFlame });
      const flame = new THREE.Mesh(flameGeometry, flameMaterial);
      flame.position.z = -0.15;
      rocketGroup.add(flame);

      rocketGroup.position.set(startX, startY, startZ);
      scene.add(rocketGroup);

      rockets.push({
        mesh: rocketGroup,
        x: startX,
        y: startY,
        z: startZ,
        velX,
        velY,
        velZ,
        lifetime: 0,
        maxLifetime: 800,
      });
    };

    for (let i = 0; i < rocketCount; i++) {
      createRocket();
    }
    rocketsRef.current = { rockets, createRocket, scene };

    // Mouse move event
    const handleMouseMove = (event) => {
      mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      frameCount++;

      // Rotate globe
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.0002;
        globeRef.current.rotation.x += 0.0001;
      }

      // Adjust camera position based on mouse
      camera.position.x = mouseX.current * 0.3;
      camera.position.y = mouseY.current * 0.3;
      camera.position.z = 2;
      camera.lookAt(0, 0, 0);

      // Update stars
      if (starsRef.current) {
        const { geometry, positions, velocities, starCount: count } = starsRef.current;
        const posAttr = geometry.getAttribute('position');
        for (let i = 0; i < count * 3; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          for (let j = 0; j < 3; j++) {
            if (positions[i + j] > 20) positions[i + j] = -20;
            if (positions[i + j] < -20) positions[i + j] = 20;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Rotate rays
      if (raysRef.current) {
        raysRef.current.rayGroup.rotation.y += 0.0002;
        raysRef.current.rayGroup.rotation.x += 0.0001;
      }

      // Update rockets
      if (rocketsRef.current) {
        const { rockets, createRocket, scene } = rocketsRef.current;
        rockets.forEach((rocket, index) => {
          rocket.lifetime++;

          rocket.x += rocket.velX;
          rocket.y += rocket.velY;
          rocket.z += rocket.velZ;
          rocket.mesh.position.set(rocket.x, rocket.y, rocket.z);

          rocket.mesh.lookAt(
            rocket.x + rocket.velX,
            rocket.y + rocket.velY,
            rocket.z + rocket.velZ
          );

          if (rocket.lifetime > rocket.maxLifetime || Math.abs(rocket.x) > 25 || Math.abs(rocket.y) > 25 || Math.abs(rocket.z) > 25) {
            scene.remove(rocket.mesh);
            rocket.mesh.geometry?.dispose();
            rocket.mesh.material?.dispose();
            rockets.splice(index, 1);
            createRocket();
          }
        });
      }

      if (frameCount % 300 === 0) {
        console.log("Animation loop running, frame:", frameCount);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      console.log("ThreeGlobe: Cleaning up");
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'auto',
      }}
    />
  );
}
