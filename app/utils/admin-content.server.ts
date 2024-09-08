// app/utils/admin-content.server.ts

import { type Content, type Prisma } from '@prisma/client'
import { prisma } from './db.server.ts'
import { requireContentAdmin } from './permissions.server.ts'

export { requireContentAdmin } from './permissions.server.ts'

export type ContentWithOwnerAndImages = Prisma.ContentGetPayload<{
    include: {
      owner: {
        select: { id: true; username: true; name: true }
      }
      images: true
    }
  }>

export async function getAdminContent(request: Request): Promise<ContentWithOwnerAndImages[]> {
  await requireContentAdmin(request)
  return prisma.content.findMany({
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      images: true,
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export async function getAdminContentById(request: Request, contentId: string): Promise<ContentWithOwnerAndImages | null> {
  await requireContentAdmin(request)
  return prisma.content.findUnique({
    where: { id: contentId },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      images: true,
    },
  })
}

type CreateContentData = Prisma.ContentCreateInput & {
  images?: Prisma.ContentImageCreateInput[]
}

export async function createAdminContent(request: Request, data: CreateContentData): Promise<ContentWithOwnerAndImages> {
  await requireContentAdmin(request)
  return prisma.content.create({
    data: {
      title: data.title,
      content: data.content,
      owner: { connect: { id: data.owner.connect?.id } },
      images: {
        create: data.images,
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      images: true,
    },
  })
}

type UpdateContentData = Prisma.ContentUpdateInput & {
  images?: {
    create?: Prisma.ContentImageCreateInput[]
    update?: Prisma.ContentImageUpdateInput[]
    delete?: Prisma.ContentImageWhereUniqueInput[]
  }
}

export async function updateAdminContent(
  request: Request,
  contentId: string,
  data: UpdateContentData
): Promise<ContentWithOwnerAndImages> {
  await requireContentAdmin(request)
  const { images, ...contentData } = data

  return prisma.content.update({
    where: { id: contentId },
    data: {
      ...contentData,
      images: images
        ? {
            deleteMany: images.delete,
            create: images.create,
            update: images.update,
          }
        : undefined,
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      images: true,
    },
  })
}

export async function deleteAdminContent(request: Request, contentId: string): Promise<Content> {
  await requireContentAdmin(request)
  return prisma.content.delete({
    where: { id: contentId },
  })
}

export type ContentStats = {
  totalContent: number
  totalImages: number
  recentContent: Array<ContentWithOwnerAndImages>
}

export async function getAdminContentStats(request: Request): Promise<ContentStats> {
  await requireContentAdmin(request)
  const [totalContent, totalImages, recentContent] = await Promise.all([
    prisma.content.count(),
    prisma.contentImage.count(),
    prisma.content.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        images: true,
      },
    }),
  ])

  return {
    totalContent,
    totalImages,
    recentContent,
  }
}