const { getSignedUrl } = require('../../services/aws')

module.exports = async (_, args, ctx, info) => {
  // aws parameters
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

  // update database and return upload url and image url
  try {
    await ctx.prisma.updateUser({ where: { id: args.id }, data: { image } })
  } catch (error) {
    console.log(error)
    throw new Error('database error')
  } finally {
    return {
      url,
      image
    }
  }
}
