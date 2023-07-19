-- CreateEnum
CREATE TYPE "Age" AS ENUM ('NULL', 'CUB', 'ADULT');

-- CreateEnum
CREATE TYPE "TypePet" AS ENUM ('NULL', 'LITTLE', 'MENDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "LevelEnergy" AS ENUM ('NULL', 'LITTLE', 'MENDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "LevelIndependence" AS ENUM ('NULL', 'LITTLE', 'MENDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('NULL', 'OPENED', 'WIDE_OPENED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PROCESS_ADOPTION', 'FREE', 'ADOPTED');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'NULL',
    "type" "TypePet" NOT NULL DEFAULT 'NULL',
    "levelEnergy" "LevelEnergy" NOT NULL DEFAULT 'NULL',
    "levelIndependence" "LevelIndependence" NOT NULL DEFAULT 'NULL',
    "environment" "Environment" NOT NULL DEFAULT 'NULL',
    "images_urls" TEXT[],
    "requirementsAdoption" TEXT[],
    "org_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'FREE',
    "city" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
