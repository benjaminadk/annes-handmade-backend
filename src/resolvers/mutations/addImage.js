const { getSignedUrl } = require('../../services/aws')

module.exports = async (_, args, ctx, info) => {
  // aws parameters needed to get signed url for uploading
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: args.filename,
    Expires: 60,
    ContentType: args.filetype,
    ACL: 'public-read'
  }

  // get upload url using aws-sdk
  const url = await getSignedUrl('putObject', params)

  // eventual image url in aws bucket
  const image = `https://shopping-site.s3.amazonaws.com/${args.filename}`

  // find and update product images in database
  try {
    const product = await ctx.prisma.product({ id: args.id })
    const images = [...product.images, image]
    await ctx.prisma.updateProduct({
      where: { id: args.id },
      data: { images: { set: images } }
    })
  } catch (error) {
    console.log(error)
    throw new Error('database error')
  } finally {
    return { url, image }
  }
}
