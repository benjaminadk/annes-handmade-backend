const { deleteObject } = require('../../services/aws')

module.exports = async (_, args, ctx, info) => {
  // delete image file from aws s3 bucket
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: args.url.slice(39)
  }

  // delete from s3 via aws-sdk
  await deleteObject(params)

  // find and update product images in database
  try {
    const product = await ctx.prisma.product({ id: args.id })
    const images = product.images.filter(image => image !== args.url)
    await ctx.prisma.updateProduct({
      where: { id: args.id },
      data: { images: { set: images } }
    })
  } catch (error) {
    console.log(error)
    throw new Error('database error')
  } finally {
    return { success: true, message: 'image deleted successfully' }
  }
}
