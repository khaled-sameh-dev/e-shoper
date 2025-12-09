// // import { Pinecone } from "@pinecone-database/pinecone";

// // const pc = new Pinecone({
// //   apiKey: process.env.PINECONE_APIKEY!,
// // });

// // const indexName = process.env.PINECONE_INDEX || 'products';

// // export const index = pc.index(indexName)

// import { Pinecone } from "@pinecone-database/pinecone";
// import { config } from "dotenv";
// config();

// const pinecone = new Pinecone({
//   apiKey: process.env.PINECONE_APIKEY || "",
// });

// const indexName = process.env.PINECONE_INDEX || "products";

// export const index = pinecone.index(indexName);

import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_APIKEY || "",
});

const indexName = process.env.PINECONE_INDEX || "products";

export const index = pinecone.index(indexName);
