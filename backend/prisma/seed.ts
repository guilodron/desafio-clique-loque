import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prismaClient = new PrismaClient();

async function main() {
    // Create users
    for (let i = 0; i < 1; i++) {
        const user = await prismaClient.user.create({
            data: {
                cnpj: faker.string.numeric({ length: 14 }),
                nomeFantasia: faker.company.name(),
                razaoSocial: faker.company.name()
            }
        });
        for (let j = 0; j < 3; j++) {
            await prismaClient.contract.create({
                data: {
                    codigoContrato: faker.string.alphanumeric({ length: 8 }),
                    retencaoTecnica: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
                    titulo: faker.book.publisher(),
                    userId: user.id
                }
            });
        }
    }
}

main()
    .then(async () => {
        await prismaClient.$disconnect();
    }).catch(async () => {
        await prismaClient.$disconnect();
        process.exit(1);
    });