import { uploadImage } from "@/lib/api/file"

export class API {
  public static uploadImage = async (file: File) => {
    const res = await uploadImage(file)
    return res
  }
}
