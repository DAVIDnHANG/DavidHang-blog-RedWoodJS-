# Migration `20200403122738-create-schema`

This migration has been generated by Rob Cameron at 4/3/2020, 12:27:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Post" (
    "author" TEXT NOT NULL  ,
    "body" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "image" TEXT   ,
    "postedAt" DATE   ,
    "slug" TEXT NOT NULL  ,
    "title" TEXT NOT NULL  
) 

CREATE TABLE "quaint"."Tag" (
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL  
) 

CREATE TABLE "quaint"."User" (
    "email" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false ,
    "name" TEXT   
) 

CREATE TABLE "quaint"."_PostToTag" (
    "A" INTEGER NOT NULL  ,
    "B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE UNIQUE INDEX "quaint"."Post.slug" ON "Post"("slug")

CREATE UNIQUE INDEX "quaint"."Tag.name" ON "Tag"("name")

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE UNIQUE INDEX "quaint"."_PostToTag_AB_unique" ON "_PostToTag"("A","B")

CREATE  INDEX "quaint"."_PostToTag_B_index" ON "_PostToTag"("B")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200403122738-create-schema
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+datasource datasource {
+  provider = "sqlite"
+  url = env("DB_HOST")
+}
+
+generator client {
+  provider = "prisma-client-js"
+  binaryTargets = ["native", "rhel-openssl-1.0.x"]
+}
+
+model Post {
+  id       Int    @id @default(autoincrement())
+  title    String
+  slug     String @unique
+  author   String
+  body     String
+  image    String?
+  postedAt DateTime?
+  tags     Tag[]  @relation(references: [id])
+}
+
+model Tag {
+  id    Int    @id @default(autoincrement())
+  name  String @unique
+  posts Post[] @relation(references: [id])
+}
+
+model User {
+  id      Int     @id @default(autoincrement())
+  name    String?
+  email   String  @unique
+  isAdmin Boolean @default(false)
+}
```

