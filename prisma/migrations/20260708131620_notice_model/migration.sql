/*
  Warnings:

  - You are about to drop the column `content` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `body` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishDate` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notice` DROP COLUMN `content`,
    ADD COLUMN `body` VARCHAR(191) NOT NULL,
    ADD COLUMN `category` ENUM('EXAM', 'EVENT', 'GENERAL') NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `priority` ENUM('NORMAL', 'URGENT') NOT NULL DEFAULT 'NORMAL',
    ADD COLUMN `publishDate` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
