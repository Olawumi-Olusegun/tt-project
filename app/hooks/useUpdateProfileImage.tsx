
import { database } from "@/libs/AppWriteClient";

const useUpdateProfileImage  = async (id: string, image: string) => {
    try {
       const updated = await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
        id,
        {
            image
        }
       )

    } catch (error) {
        console.log({error})
        throw error
    }
}

export default useUpdateProfileImage;