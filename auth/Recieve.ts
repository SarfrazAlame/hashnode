export const UserDetails = async(id:string)=>{
    try {
        const user = await prisma?.user.findUnique({
            where:{
                id
            }
        })
        return user
    } catch (error) {
        return {
            message:"failed to get user"
        }
    }
}