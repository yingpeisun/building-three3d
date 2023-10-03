import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function (containerId: string) {
  onMounted(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error("未找到承载容器");
    }
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(50, 70, 200);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 创建光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(50, 150, 50);
    scene.add(ambientLight);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    // 使用GLTFLoader加载模型
    const loader = new GLTFLoader();
    let model: THREE.Object3D<THREE.Event> | THREE.Group;
    loader.load("model/modelHouse.gltf", (gltf) => {
      model = gltf.scene;
      /*// 调整相机位置，使模型完全可见
                  const boundingBox = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
                  const center = boundingBox.getCenter(new THREE.Vector3()); // 获取包围盒的中心点
                  const size = boundingBox.getSize(new THREE.Vector3()); // 获取包围盒的尺寸

                  const maxDim = Math.max(size.x, size.y, size.z); // 获取包围盒的最大尺寸
                  const fov = camera.fov * (Math.PI / 180); // 将角度转换为弧度
                  let cameraDistance = maxDim / (2 * Math.tan(fov / 2)); // 计算相机到模型的距离

                  // 根据需要调整距离，例如乘以一个系数
                  cameraDistance *= 2;

                  camera.position.copy(center); // 将相机定位到包围盒中心
                  camera.position.z += cameraDistance; // 调整相机距离模型的位置
                  camera.lookAt(center); // 将相机视角指向包围盒中心*/
      model.rotateX(-Math.PI / 2);
      model.rotateZ(-Math.PI / 2);
      model.translateX(-160);
      scene.add(model);
    });

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        // 在这里可以对模型进行任何的变换操作
        // 例如：
        // model.rotation.z += 0.01;
      }
      renderer.render(scene, camera);
    };

    controls.update();
    animate();
  });
}
