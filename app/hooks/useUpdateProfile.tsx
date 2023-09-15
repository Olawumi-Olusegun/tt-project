
import { database } from "@/libs/AppWriteClient";

const useUpdateProfile  = async (id: string, name: string,  bio: string) => {
    try {
       const updated = await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
        id,
        {
            name,
            bio,
        }
       )

    } catch (error) {
        throw error
    }
}

export default useUpdateProfile;