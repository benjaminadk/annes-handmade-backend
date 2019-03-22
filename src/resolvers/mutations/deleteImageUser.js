const { deleteObject } = require('../../services/aws')

module.exports = async (_, args, ctx, info) => {
  // aws parameters
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: args.url.slice(39)
  }

  // delete from s3 using aws-sdk
  await deleteObject(params)

  // update user in database
  try {
    await ctx.prisma.updateUser({ where: { id: args.id }, data: { image: '' } })
  } catch (error) {
    console.log(error)
    throw new Error('database error')
  } finally {
    return { success: true, message: 'image deleted successfully' }
  }
}
