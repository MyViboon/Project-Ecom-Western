-- AlterTable
ALTER TABLE `product` ADD COLUMN `catagoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_catagoryId_fkey` FOREIGN KEY (`catagoryId`) REFERENCES `Catagory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
