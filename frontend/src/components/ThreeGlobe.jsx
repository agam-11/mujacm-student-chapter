import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeGlobe() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x110053, 1); // Dark purple background
    containerRef.current.appendChild(renderer.domElement);
  renderer.domElement.style.pointerEvents = 'auto';
  renderer.domElement.style.zIndex = '1'; // Set a reasonable zIndex
    rendererRef.current = renderer;

    // Create wireframe globe
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1f00a9,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Add particles/stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Position stars in a larger space
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
      
      // Give each star a random velocity
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xd4d4d4,
      size: 0.03,
      transparent: true,
      opacity: 0.9,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse interaction (smoothed)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    const lerp = (a, b, t) => a + (b - a) * t;
    const handleMouseMove = (event) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseX = nx;
      mouseY = ny;
      // Map mouse to target rotations
      targetRotY = mouseX * 0.8; // yaw
      targetRotX = mouseY * 0.6; // pitch
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Smoothly interpolate globe rotation towards targetRot
      if (globeRef.current) {
        globeRef.current.rotation.y = lerp(globeRef.current.rotation.y, targetRotY + globeRef.current.rotation.y + 0.002, 0.05);
        globeRef.current.rotation.x = lerp(globeRef.current.rotation.x, targetRotX + globeRef.current.rotation.x + 0.001, 0.05);
      }

      // Update stars positions with their velocities
      const posAttr = starGeometry.getAttribute('position');
      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Wrap stars when they move too far away
        for (let j = 0; j < 3; j++) {
          if (positions[i + j] > 20) positions[i + j] = -20;
          if (positions[i + j] < -20) positions[i + j] = 20;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}
