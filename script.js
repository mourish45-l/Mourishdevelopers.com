// Initialize Three.js animated background
(function() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('three-bg'),
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x031b4e, 1);

  // Geometry and Material
  const geometry = new THREE.TorusKnotGeometry(12, 3, 150, 20);
  const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.5,
    roughness: 0.4,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x4f46e5, 3);
  pointLight.position.set(20, 15, 20);
  scene.add(pointLight);

  camera.position.z = 40;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.008;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// Handle broken images for Project and AI Tool sections
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card img, .ai-tool-card img').forEach(img => {
    img.onerror = () => {
      // Remove broken image
      img.remove();

      // Create icon fallback
      const icon = document.createElement('i');
      icon.className = 'bx bx-error-circle text-white text-4xl';
      // Insert icon where the image was
      img.parentNode.insertBefore(icon, img.nextSibling);
    };
  });
});
