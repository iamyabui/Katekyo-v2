import {
  // deleteObject,
  getDownloadURL,
  getStorage,
  // listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

export const uploadImage = async (
  userId: string,
  file: File,
  setFileLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setFileLoading(true);
  const storage = getStorage();
  const uploadRef = ref(storage, `images/${userId}/${file.name}`);

  // const imagesRef = ref(storage, `images/${userId}/`);
  // const imagesList = await listAll(imagesRef);
  // for (const item of imagesList.items) {
  //   await deleteObject(item);
  // }

  await uploadBytes(uploadRef, file)
    .then(() => setFileLoading(false))
    .catch(() => setFileLoading(false));

  const downloadUrl = await getDownloadURL(uploadRef);
  return downloadUrl;
};
