import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";

const getResponse = async (text) => {
  console.log(text);
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/get_objects`,
    {
      user_input: text,
    },
    {
      withCredentials: true,
    }
  );
  return data;
};

async function uploadImage(containerName, file) {
  const blobServiceClient = new BlobServiceClient(
    "connection-string-to-your-storage-account + sas tokken"
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(file.name);
  const blockBlobClient = blobClient.getBlockBlobClient();
  const result = await blockBlobClient.uploadBrowserData(file, {
    blockSize: 4 * 1024 * 1024,
    concurrency: 20,
    onProgress: (ev) => console.log(ev),
  });
  console.log(`Upload of file '${file.name}' completed`);
}

export { getResponse, uploadImage };
