// import { InferenceClient } from "@huggingface/inference";

// const hf = new InferenceClient(process.env.HF_TOKEN!);

// const normalizeEmbedding = (embedding: unknown) => {
//   if (typeof embedding === "number") {
//     return [embedding];
//   }
//   if (Array.isArray(embedding)) {
//     return embedding
//       .flatMap((item) => (Array.isArray(item) ? item : [item]))
//       .map(Number);
//   }

//   throw new Error("Invalid Embedding Formate");
// };

// export async function embedText(text: string): Promise<number[]> {
//   try {
//     const response = await hf.featureExtraction({
//       model: "sentence-transformers/all-MiniLM-L6-v2",
//       inputs: text,
//     });

//     let vector: any[];

//     if (Array.isArray(response)) {
//       vector = Array.isArray(response[0]) ? response[0] : response;
//     } else if (typeof response === "number") {
//       vector = [response];
//     } else {
//       throw new Error("Unexpected response format from HuggingFace");
//     }

//     if (vector.length !== 384) {
//       throw new Error(
//         `Invalid embedding dimension: ${vector.length}, expected 384`
//       );
//     }

//     // Normalize the vector
//     const normalized = normalizeEmbedding(vector);

//     return normalized;
//   } catch (error: any) {
//     console.error("Error generating embedding:", error.message);
//     throw error;
//   }
// }

import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN!);


const normalizeVector = (vector: number[]) => {
  const normalized = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  return vector.map((v) => v / normalized);
};
const poolingVector = (vector: number[][]): number[] => {
  const dimensions = vector[0].length;
  const pooled = new Array(dimensions).fill(0);

  for (const token of vector) {
    for (let i = 0; i < dimensions; i++) {
      pooled[i] += token[i];
    }
  }

  return pooled.map((item) => item / vector.length);
};

export const embedText = async (text: string): Promise<number[]> => {
  const res = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: text,
  });

  let vector: number[];

  if (Array.isArray(res) && Array.isArray(res[0])) {
    vector = poolingVector(res as number[][]);
  } else if (Array.isArray(res)) {
    vector = res as number[];
  } else {
    throw new Error("Unexpected HF embedding response");
  }

  if (vector.length !== 384) {
    throw new Error(
      `Invalid embedding dimension: ${vector.length}, expected 384`
    );
  }

  return normalizeVector(vector);
};
