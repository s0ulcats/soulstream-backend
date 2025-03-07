import { BadRequestException, Logger } from "@nestjs/common"
import { Prisma, PrismaClient } from "@prisma/client"
import { CATEGORIES } from "./data/categories.data"
import { USERNAMES } from "./data/users.data"
import { STREAMS } from "./data/streams.data"
import { hash } from "argon2"

const prisma = new PrismaClient({
    transactionOptions: {
        maxWait: 10000, // Увеличить ожидание перед таймаутом
        timeout: 60000, // Увеличить сам таймаут транзакции
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    }
})

async function main() {
    try {
        Logger.log('Start filling out the database')

        await prisma.$transaction([
            prisma.user.deleteMany(),
            prisma.socialLink.deleteMany(),
            prisma.stream.deleteMany(),
            prisma.category.deleteMany()
        ])

        await prisma.category.createMany({
            data: CATEGORIES
        })

        Logger.log('Категории успешно созданы')

        const categories = await prisma.category.findMany()

        const categoriesBySlug = Object.fromEntries(
            categories.map(category => [category.slug, category])
        )

        for (const username of USERNAMES) {
            await prisma.$transaction(async tx => {
                const randomCategory = categoriesBySlug[
                    Object.keys(categoriesBySlug)[
                        Math.floor(Math.random() * Object.keys(categoriesBySlug).length)
                    ]
                ]
        
                const userExists = await tx.user.findUnique({ where: { username } })
        
                if (!userExists) {
                    const createdUser = await tx.user.create({
                        data: {
                            email: `${username}@gmail.com`,
                            password: await hash('12345678'),
                            username,
                            displayName: username,
                            avatar: `/channels/${username}.webp`,
                            isEmailVerified: true,
                            socialLinks: {
                                createMany: {
                                    data: [
                                        {
                                            title: 'Telegram',
                                            url: `https://t.me/${username}`,
                                            position: 1
                                        },
                                        {
                                            title: 'YouTube',
                                            url: `https://youtube.com/@${username}`,
                                            position: 2
                                        }
                                    ]
                                }
                            },
                            notificationSettings: {
                                create: {
                                    siteNotifications: true
                                }
                            }
                        }
                    })
        
                    const randomTitles = STREAMS[randomCategory.slug]
                    const randomTitle = randomTitles[Math.floor(Math.random() * randomTitles.length)]
        
                    await tx.stream.create({
                        data: {
                            title: randomTitle,
                            thumbnailUrl: `/streams/${createdUser.username}.webp`,
                            user: {
                                connect: {
                                    id: createdUser.id
                                }
                            },
                            category: {
                                connect: {
                                    id: randomCategory.id
                                }
                            }
                        }
                    })
        
                    Logger.log(`User "${createdUser.username}" and his stream was successfully created`)
                }
            })
        }

        Logger.log('Filling out the database successefully finish ')
    } catch (error) {
        Logger.log(error)
        throw new BadRequestException(`Error when filling out the database`)
    } finally {
        Logger.log('Clossing connection with database')
        await prisma.$disconnect()
        Logger.log('Connection with database was successfully closed')
    }
}

main()