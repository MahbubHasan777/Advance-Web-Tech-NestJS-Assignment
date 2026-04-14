# Lab Task 04: Single Entity CRUD with TypeORM &

# PostgreSQL

```
Entity · Repository · CRUD Operations · DTO Validation · Query & Filter
```
## 1. Instructions

```
➢ Complete the task following all requirements carefully.
➢ After completion, push your project to your GitHub repository.
➢ Project structure must be clean and properly organized.
➢ Follow proper NestJS architecture (Module → Controller → Service → Entity → DTO).
➢ No relationships are required — this task focuses on a single entity only.
➢ All database operations must go through TypeORM repositories — no raw SQL.
➢ All incoming request data must be validated using DTOs and class-validator.
```
## 2. Scenario

You are building a Product Inventory API for an e-commerce platform. The system manages
products stored in a PostgreSQL database using TypeORM. You will implement full CRUD
operations (Create, Read, Update, Delete), input validation using DTOs, and basic query
features such as filtering by category and searching by name. There are no relationships in this
task — only a single Products entity and its table.

## 3. Background — Entity & Repository Pattern

Entity: A TypeScript class decorated with @Entity() that maps directly to a database table.
Each property decorated with @Column() becomes a column in that table.

Repository: TypeORM provides a Repository class for each entity that contains all database
methods (find, findOne, save, update, delete). You inject it into your service using
@InjectRepository().

TypeORM Repository Methods you will use:

```
repo.find() — fetch all records
repo.findOne({ where }) — fetch one record by condition
repo.save(entity) — insert or update a record
repo.update(id, partial) — update specific fields by id
repo.delete(id) — delete a record by id
repo.find({ where, order })— fetch with filters and sorting
```

## 4. Requirements & Steps

### Step 1: Create a New Project

```
nest new ProductInventoryAPI
cd ProductInventoryAPI
```
```
nest g module products
nest g controller products
nest g service products
```
### Step 2: Install Required Packages

```
npm install @nestjs/typeorm typeorm pg
npm install class-validator class-transformer
npm install @nestjs/mapped-types
```
### Step 3: Setup PostgreSQL & Environment

Create the database in PostgreSQL:

```
CREATE DATABASE product_inventory_db;
```
### Step 4: Configure TypeORM in app.module.ts

```
@Module({
imports: [ProductsModule, TypeOrmModule.forRoot({
type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'your_password',
database: 'product_inventory_db',
autoLoadEntities: true,
synchronize: true,
}),
],
})
export class AppModule {}
```
### Step 5: Enable Global Validation in main.ts

```
app.useGlobalPipes(new ValidationPipe({
whitelist: true,
forbidNonWhitelisted: true,
transform: true,
}));
```

### Step 6: Expected Project Structure

```
ProductInventoryAPI/
├── src/
│ ├── products/
│ │ ├── entities/
│ │ │ └── products.entity.ts
│ │ ├── dto/
│ │ │ ├── create-product.dto.ts
│ │ │ ├── update-product.dto.ts
│ │ │ └── partial-update-product.dto.ts
│ │ ├── products.module.ts
│ │ ├── products.controller.ts
│ │ └── products.service.ts
│ ├── app.module.ts
│ └── main.ts
├── .gitignore
└── package.json
```
## 5. Product Entity

Create products.entity.ts inside the entities/ folder. The product table must have the following
columns:

```
Column Type Decorator / Option Description
```
```
id number @PrimaryGeneratedColumn()^ Auto-increment primary
key
```
```
name string @Column()^ Product name
```
```
description string @Column({ nullable: true
})
```
```
Optional product
description
```
```
price number @Column({ type:
'decimal', precision: 10,
scale: 2 })
```
```
Price with 2 decimal
places
```
```
stock number @Column({ default: 0 })^ Available stock quantity
category string @Column()^ Product category e.g.
Electronics
isActive boolean @Column({ default: true
})
```
```
Whether product is
active/visible
```
```
createdAt Date @CreateDateColumn()^ Auto-set when record is
created
```
```
updatedAt Date @UpdateDateColumn()^ Auto-set when record is
updated
```

Note: @CreateDateColumn() and @UpdateDateColumn() are TypeORM decorators that
automatically manage timestamps — you never set them manually.

Example entity class:

```
import { Entity, PrimaryGeneratedColumn, Column,
CreateDateColumn, UpdateDateColumn } from 'typeorm';
```
```
@Entity()
export class Products {
@PrimaryGeneratedColumn()
id: number;
```
```
@Column()
name: string;
```
```
@Column({ nullable: true })
description: string;
```
```
@Column({ type: 'decimal', precision: 10, scale: 2 })
price: number;
```
```
@Column({ default: 0 })
stock: number;
```
```
@Column()
category: string;
```
```
@Column({ default: true })
isActive: boolean;
```
```
@CreateDateColumn()
createdAt: Date;
```
```
@UpdateDateColumn()
updatedAt: Date;
}
```
## 6. DTOs (Data Transfer Objects)

### create-product.dto.ts — Validation Rules

```
Field Type Required Validators
```
```
name string Yes @IsString(), @IsNotEmpty()^
description string No @IsString(), @IsOptional()^
```

```
price number Yes @IsNumber(), @IsPositive(),
@Type(() => Number)
```
```
stock number No @IsInt(), @Min(0),
@IsOptional(), @Type(() =>
Number)
```
```
category string Yes @IsString(), @IsNotEmpty()^
```
```
isActive boolean No @IsBoolean(), @IsOptional()^
```
### update-product.dto.ts — Used by PUT (full replacement)

Extends CreateProductDto directly — all validation rules are inherited and all required fields
remain required. Used for the PUT route where the client must send every field.

```
import { CreateProductDto } from './create-product.dto';
```
```
export class UpdateProductDto extends CreateProductDto {}
```
### partial-update-product.dto.ts — Used by PATCH (partial update)

Uses PartialType to extend CreateProductDto — all fields become optional automatically. Used
for the PATCH route where the client sends only the fields they want to change.

```
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
```
```
export class PartialUpdateProductDto extends PartialType(CreateProductDto)
{}
```
dto/ folder structure:

```
dto/
├── create-product.dto.ts
├── update-product.dto.ts ← extends CreateProductDto (PUT)
└── partial-update-product.dto.ts ← PartialType of CreateProductDto
(PATCH)
```
## 7. Product Service

Inject the ProductsRepository in the constructor and implement the following methods. All
methods must return structured response objects.

### Constructor — inject repository

```
constructor(
@InjectRepository(Products)
private productsRepo: Repository<Products>,
) {}
```

### Methods to implement

```
Method Parameters What it should
do
```
```
Return Object
```
create() (^) dto: CreateProductDto Create and save
a new product
{ message, data:
product }
findAll() (^) none Return all
products
ordered by
createdAt DESC
{ message, count,
data: [] }
findOne() (^) id: number Return one
product by id,
throw 404 if not
found
{ message, data:
product }
update() (^) id: number, dto:
PartialUpdateProductDto
Partially update
product fields
(PATCH), return
updated product
{ message, data:
product }
replace() (^) id: number, dto:
UpdateProductDto
Fully replace all
product fields
(PUT), return
updated product
{ message, data:
product }
remove() (^) id: number Delete product
by id, throw 404
if not found
{ message, id }
findByCategory() (^) category: string Return all
products
matching the
given category
{ message, count,
data: [] }
search() (^) keyword: string Return products
where name
contains the
keyword
{ message, count,
data: [] }
toggleActive() (^) id: number Flip the isActive
boolean value
and save
{ message, data:
product }

### Throwing a 404 Not Found error

Import NotFoundException from @nestjs/common and throw it when a product is not found:

```
const product = await this.productsRepo.findOne({ where: { id } });
if (!product) throw new NotFoundException(`Product with id ${id} not
found`);
```

### Hint for search() — use ILike for case-insensitive search

```
import { ILike } from 'typeorm';
```
```
return this.productsRepo.find({
where: { name: ILike(`%${keyword}%`) },
});
```
### Hint for findAll() — sort by newest first

```
return this.productsRepo.find({
order: { createdAt: 'DESC' },
});
```
## 8. Product Module

Register the entity and wire up the module in products.module.ts:

```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
```
```
@Module({
imports: [TypeOrmModule.forFeature([Products])],
controllers: [ProductsController],
providers: [ProductsService],
})
export class ProductsModule {}
```
TypeOrmModule.forFeature([Products]) registers the entity for this module and makes the
ProductsRepository available to inject in ProductsService.


## 9. Product Controller

Implement the following routes in products.controller.ts. Use @Controller('products') and inject
ProductsService via constructor.

```
Method Route Description What to Pass to Service
```
```
POST /products Create a new
product
```
```
@Body() dto
```
```
GET /products Get all products
(newest first)
```
```
nothing
```
```
GET /products/search Search products
by name keyword
```
```
@Query('keyword')
```
```
GET /products/category/:cat Get all products
in a category
```
```
@Param('cat')
```
```
GET /products/:id Get one product
by id
```
```
@Param('id',
ParseIntPipe) id
```
```
PATCH /products/:id Update a product
(partial)
```
```
@Param('id',
ParseIntPipe) id,
@Body() dto
```
```
PUT /products/:id Replace a
product fully (all
fields required)
```
```
@Param('id',
ParseIntPipe) id,
@Body() dto
```
```
DELETE /products/:id Delete a product @Param('id',
ParseIntPipe) id
```
```
PATCH /products/:id/toggle Toggle product
active/inactive
status
```
```
@Param('id',
ParseIntPipe) id
```
Route order matters! In NestJS, routes are matched top-to-bottom. Always define specific
routes like /products/search and /products/category/:cat BEFORE the generic /products/:id
route. Otherwise, NestJS will treat 'search' and 'category' as id values.

Use @Query() to receive query parameters from the URL:

```
// GET /products/search?keyword=phone
@Get('search')
search(@Query('keyword') keyword: string) {
return this.productsService.search(keyword);
}
```
Example of correct ParseIntPipe usage:

```
import { Controller, Get, Post, Patch, Put, Delete,
Param, Body, Query, ParseIntPipe } from '@nestjs/common';
```

```
@Controller('products')
export class ProductsController {
constructor(private readonly productsService: ProductsService) {}
```
```
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
return this.productsService.findOne(id);
}
```
```
@Patch(':id')
update(
@Param('id', ParseIntPipe) id: number,
@Body() dto: PartialUpdateProductDto,
) {
return this.productsService.update(id, dto);
}
```
```
@Put(':id')
replace(
@Param('id', ParseIntPipe) id: number,
@Body() dto: UpdateProductDto,
) {
return this.productsService.replace(id, dto);
}
}
```
## 10. Testing Requirements

Test all routes using Postman in the following order:

### Create Products

- POST /products — Body: { "name": "iPhone 15", "price": 999.99, "stock": 50, "category":
    "Electronics" }
- POST /products — Body: { "name": "Samsung TV", "price": 499.99, "stock": 20,
    "category": "Electronics" }
- POST /products — Body: { "name": "Running Shoes", "price": 89.99, "stock": 100,
    "category": "Sports" }
- POST /products — Body: { "name": "Notebook", "price": 4.99, "stock": 200, "category":
    "Stationery" }

### Read Operations

- GET /products — verify all 4 products are returned ordered by newest first
- GET /products/1 — verify the first product is returned


- GET /products/999 — verify a 404 Not Found error is returned
- GET /products/category/Electronics — verify only Electronics products are returned
- GET /products/search?keyword=phone — verify iPhone 15 appears in results
- GET /products/search?keyword=s — verify products with 's' in the name are returned

### Update & Toggle

- PATCH /products/1 — Body: { "price": 899.99, "stock": 45 } — verify only those two fields
    changed
- PATCH /products/1 — Body: { "name": "" } — verify validation error: name should not be
    empty
- PUT /products/1 — Body: { "name": "iPhone 15 Pro", "price": 1099.99, "stock": 30,
    "category": "Electronics" } — verify all fields are replaced
- PUT /products/1 — Body: { "price": 799.99 } — verify validation error: name, category
    are required (all fields must be provided)
- PATCH /products/1/toggle — verify isActive changes from true to false
- PATCH /products/1/toggle — verify isActive changes back to true

### Delete

- DELETE /products/4 — verify success response with deleted id
- DELETE /products/4 — verify 404 Not Found (already deleted)
- GET /products — verify only 3 products remain

### Validation Errors

- POST /products with missing name — expect: name should not be empty
- POST /products with price: - 5 — expect: price must be a positive number
- POST /products with extra unknown field — expect: property X should not exist
- POST /products with no body — expect full list of validation errors

## 11. Architecture Rules

```
➢ Entity must use @Entity(), @PrimaryGeneratedColumn(), and @Column() decorators
➢ Never manually set createdAt or updatedAt — use @CreateDateColumn() and
@UpdateDateColumn()
➢ Inject repository using @InjectRepository(Products) — never use new Repository()
➢ All database calls must be in the Service — never in the Controller
➢ Use NotFoundException for missing records — never return null to the client
➢ Use PartialType for UpdateDto — never copy-paste fields from CreateDto manually
➢ Always use ParseIntPipe with @Param('id') to convert route params from string to
number
```

➢ Define specific routes (search, category) before parameterized routes (:id)

➢ Use @Controller('products') (plural) to match all defined routes

➢ synchronize: true is for development only — never use in production


