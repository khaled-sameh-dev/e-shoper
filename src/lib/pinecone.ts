import { Pinecone } from "@pinecone-database/pinecone";

interface QueryFilter {
  [key: string]: string | number | boolean | string[] | number[];
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_APIKEY || "",
});

const indexName = process.env.PINECONE_INDEX || "products";

export const index = pinecone.index(indexName);

export async function queryVector(
  vector: number[],
  topK = 10,
  filter?: QueryFilter
) {
  try {
    if (vector.length !== 384) {
      throw new Error(
        `Invalid vector dimension: ${vector.length}, expected 384`
      );
    }

    const queryReqOptions: any = {
      vector,
      topK,
      includeMetadata: true,
    };

    if (filter && Object.keys(filter).length > 0) {
      queryReqOptions.filter = filter;
    }
    const response = await index.query(queryReqOptions);

    return response;
  } catch (error: any) {
    console.error("Error querying Pinecone:", error.message);
    throw error;
  }
}


const BATCH_SIZE = 100;

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

    for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
      await index.upsert(vectors.slice(i, i + BATCH_SIZE));
    }
    console.log(`Successfully upserted ${vectors.length} vectors`);
  } catch (error: any) {
    console.error("Error upserting vectors:", error.message);
    throw error;
  }
}

export async function deleteAllVectors() {
  await index.deleteAll();

  console.log("Pinecone index cleared");
}
