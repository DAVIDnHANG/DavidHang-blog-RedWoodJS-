/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function main() {
  const tagData = [
    {
      name: 'Data Science',
    },
    {
      name: 'Modeling',
    },
    {
      name: 'Analyst',
    },
    {
      name: 'Python',
    },
    {
      name: '?',
    },
  ]

  const tags = []

  await asyncForEach(tagData, async (tag) => {
    tags.push(
      await prisma.tag.create({
        data: tag,
      })
    )
  })

  const postData = [
    {
      title: 'Data Science Journey',
      slug: 'Data Science Journey',
      author: 'David Hang',
      postedAt: new Date('2020-05-6 '),
      body:
        'stiff',
      image: '',
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[1].id }, { id: tags[3].id }],
      },
    },
    {
      title: 'blogPost page up and running',
      slug: 'blogpost page',
      author: 'David Hang',
      postedAt: new Date('2020-6-5 1:28:00'),
      body:
        'blogpos is up and running
          ,
      image: 'https://cdn.filestackcontent.com/iDTWDVRSRmaH5Xs3M3g6',
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[1].id }, { id: tags[3].id }],
      },
    },
  ]

  const posts = []

  await asyncForEach(postData, async (post) => {
    console.log(`Creating ${post.title}...`)
    posts.push(
      await prisma.post.create({
        data: post,
      })
    )
  })

  console.info(`\nSeeded ${postData.length} posts\n`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.disconnect()
  })
