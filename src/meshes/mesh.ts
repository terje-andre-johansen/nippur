import { Mesh, Vector3, VertexData } from "babylonjs";

export interface IMeshOptions {
  xSegments: number;
  ySegments: number;
}

export default function Generate(
  name: string = "world",
  options: IMeshOptions = {
    xSegments: 1,
    ySegments: 1
  }
) {
  const { xSegments, ySegments } = options;

//   if (xSegments % 2 !== 0 || ySegments % 2 !== 0) {
//     throw "segments must be even numbers";
//   }

  const mesh = new Mesh(name);
  const vertexData = new VertexData();

  let positions = [];
  let indices = [];

  for (let x = 0; x < xSegments; x++) {
    for (let z = 0; z < ySegments; z++) {
      let v1 = new Vector3(x + 1, 0, z - 1);
      let v2 = new Vector3(x - 1, 0, z - 1);
      let v3 = new Vector3(x - 1, 0, z + 1);
      let v4 = new Vector3(x + 1, 0, z + 1);


    }
  }
}
