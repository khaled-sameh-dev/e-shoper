import { InferenceClient } from "@huggingface/inference";
import { index } from "./pinecone";

const hf = new InferenceClient(process.env.HF_TOKEN!);

const normalizeEmbedding = (embedding: unknown) => {
  if (typeof embedding === "number") {
    return [embedding];
  }
  if (Array.isArray(embedding)) {
    return embedding
      .flatMap((item) => (Array.isArray(item) ? item : [item]))
      .map(Number);
  }

  throw new Error("Invalid Embedding Formate");
};

export async function embedText(text: string): Promise<number[]> {
  try {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    let vector: any[];

    if (Array.isArray(response)) {
      vector = Array.isArray(response[0]) ? response[0] : response;
    } else if (typeof response === "number") {
      vector = [response];
    } else {
      throw new Error("Unexpected response format from HuggingFace");
    }

    if (vector.length !== 384) {
      throw new Error(
        `Invalid embedding dimension: ${vector.length}, expected 384`
      );
    }

    // Normalize the vector
    const normalized = normalizeEmbedding(vector);

    return normalized;
  } catch (error: any) {
    console.error("Error generating embedding:", error.message);
    throw error;
  }
}

export async function queryVector(
  vector: number[],
  topK = 10,
  filter?: Record<string, any>
) {
  try {
    if (vector.length !== 384) {
      throw new Error(
        `Invalid vector dimension: ${vector.length}, expected 384`
      );
    }

    const queryReq: any = {
      vector,
      topK,
      includeMetadata: true,
    };

    if (filter && Object.keys(filter).length > 0) {
      queryReq.filter = filter;
    }
    const response = await index.query(queryReq);

    return response;
  } catch (error: any) {
    console.error("Error querying Pinecone:", error.message);
    throw error;
  }
}

export async function upsertVectors(
  vectors: { id: string; values: number[]; metadata?: Record<string, any> }[]
) {
  if (vectors.length === 0) {
    console.log("No vectors to upsert");
    return;
  }

  try {
    for (const vec of vectors) {
      if (vec.values.length !== 384) {
        throw new Error(
          `Vector ${vec.id} has invalid dimension: ${vec.values.length}`
        );
      }
    }

    await index.upsert(vectors);
    console.log(`Successfully upserted ${vectors.length} vectors`);
  } catch (error: any) {
    console.error("Error upserting vectors:", error.message);
    throw error;
  }
}
