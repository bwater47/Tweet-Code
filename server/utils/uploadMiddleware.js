// Import GraphQLUpload from graphql-upload.
import { GraphQLUpload } from "graphql-upload";
// Export the Upload component from GraphQLUpload.
export const Upload = GraphQLUpload;
// Export the processUpload function to process the uploaded file.
export const processUpload = async (upload) => {
  // Destructure the createReadStream function from the upload object.
  const { createReadStream } = await upload;
  // Create a read stream from the file.
  const stream = createReadStream();
  // Create an empty array to store the chunks of the file.
  const chunks = [];
  // Iterate over the stream and push the chunks to the array.
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  // Concatenate the chunks into a buffer and convert it to a base64 string.
  const buffer = Buffer.concat(chunks);
  return buffer.toString("base64");
};
