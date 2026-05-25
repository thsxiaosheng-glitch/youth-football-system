/*
  Warnings:

  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `attack` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `stamina` on the `Player` table. All the data in the column will be lost.
  - Added the required column `shooting` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Match";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Training";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "shooting" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Player" ("age", "createdAt", "id", "name", "position") SELECT "age", "createdAt", "id", "name", "position" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
