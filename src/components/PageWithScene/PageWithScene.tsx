import * as React from "react";
import * as BABYLON from "babylonjs";
import BabylonScene, { SceneEventArgs } from "../Scene/Scene"; // import the component above linking to file we just created.
import {
  Vector3,
  Angle,
  MeshBuilder,
  SphereBuilder,
  StandardMaterial,
  Color3
} from "babylonjs";
import KeyCodes from "../../KeyCodes";
import set from "../../set";

export default class PageWithScene extends React.Component<{}, {}> {
  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;

    scene.ambientColor = new BABYLON.Color3(1, 1, 1);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.UniversalCamera(
      "camera1",
      new BABYLON.Vector3(0, 10, -20),
      scene
    );

    camera.keysUp = [KeyCodes.w, KeyCodes.forward];
    camera.keysDown = [KeyCodes.s, KeyCodes.back];
    camera.keysLeft = [KeyCodes.left, KeyCodes.a];
    camera.keysRight = [KeyCodes.right, KeyCodes.d];
    // camera.keysLeft = [37];
    // camera.keysRight = [39];
    // camera.keysDown = [31];

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    var myBox = BABYLON.MeshBuilder.CreateBox("myBox", {
      height: 5,
      width: 2,
      depth: 0.5
    });
    myBox.position = Vector3.FromArray([0, 0, 3]);
    myBox.material = new StandardMaterial("box", scene);

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // var sphere = BABYLON.Mesh.CreateSphere(
    //   "sphere1",
    //   { segments: 32, diameter: 2, diameterX: 3 },
    //   scene
    // );
    const sphere = SphereBuilder.CreateSphere(
      "sphereBuilder",
      {
        segments: 32,
        diameter: 2,
        diameterX: 3,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
      },
      scene
    );
    let material = new StandardMaterial("myMaterial", scene);
    material.diffuseColor = new Color3(0.3, 0.5, 1);
    material.specularColor = new Color3(1, 0.5, 0.5);
    // material.emissiveColor = new Color3(.25, .25, .25);
    // material.alpha = .7;
    sphere.material = material;

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    ground.position = new Vector3(0, -2, 0);
    ground.material = set(new StandardMaterial("mat2", scene), {
      diffuseColor: new Color3(0.5, 0.2, 0.1)
    });

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.3;
    light.diffuse = Color3.Red();

    // light.intensity = 0.1;
    // light.diffuse = Color3.Red();

    var light2 = new BABYLON.PointLight(
      "pointLight",
      new BABYLON.Vector3(1, 10, 1),
      scene
    );
    light2.intensity = 0.5;
    light2.diffuse = Color3.Green();
    light2.excludedMeshes = [myBox];

    // ground.rotate(new Vector3(-1, 0, 0), Angle.FromDegrees(45).radians());

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  render() {
    return (
      <div>
        <BabylonScene
          width={1024}
          height={1024}
          onSceneMount={this.onSceneMount}
        />
      </div>
    );
  }
}
