import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PartialUpdateProductDto } from './dtos/partial-update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private readonly productRepo: Repository<Products>
    ) {}

    async create(dto: CreateProductDto) {
        const product = this.productRepo.create(dto);
        const saved = await this.productRepo.save(product);
        return { message: 'Product created successfully', data: saved };
    }

    async findAll() {
        const products = await this.productRepo.find({ order: { createdAt: 'DESC' } });
        return { message: 'Products fetched successfully', count: products.length, data: products };
    }

    async findOne(id: number) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        return { message: 'Product fetched successfully', data: product };
    }

    async update(id: number, dto: PartialUpdateProductDto) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        await this.productRepo.update(id, dto);
        const updated = await this.productRepo.findOne({ where: { id } });
        return { message: 'Product updated successfully', data: updated };
    }

    async replace(id: number, dto: UpdateProductDto) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        await this.productRepo.update(id, dto);
        const updated = await this.productRepo.findOne({ where: { id } });
        return { message: 'Product replaced successfully', data: updated };
    }

    async remove(id: number) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        await this.productRepo.delete(id);
        return { message: 'Product deleted successfully', id };
    }

    async findByCategory(category: string) {
        const products = await this.productRepo.find({ where: { category } });
        return { message: 'Products fetched by category', count: products.length, data: products };
    }

    async search(keyword: string) {
        const products = await this.productRepo.find({ where: { name: ILike(`%${keyword}%`) } });
        return { message: 'Search results', count: products.length, data: products };
    }

    async toggleActive(id: number) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        product.isActive = !product.isActive;
        const saved = await this.productRepo.save(product);
        return { message: 'Product active status toggled', data: saved };
    }
}

