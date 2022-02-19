-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_handle_key" ON "Shop"("handle");
