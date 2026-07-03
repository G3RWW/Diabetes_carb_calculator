/*
  Warnings:

  - Added the required column `userId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT,
    "customName" TEXT,
    "customCarbsPer100" REAL,
    "amountGrams" REAL NOT NULL,
    "carbsTotal" REAL NOT NULL,
    "loggedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mealType" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Entry_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("amountGrams", "carbsTotal", "customCarbsPer100", "customName", "id", "loggedAt", "mealType", "productId") SELECT "amountGrams", "carbsTotal", "customCarbsPer100", "customName", "id", "loggedAt", "mealType", "productId" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
