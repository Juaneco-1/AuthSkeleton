import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { UpdateDependencyDto } from './dto/update-dependency.dto';
import { Dependency } from './entities/dependency.entity';
import {v4 as uuidv4} from 'uuid';
@Injectable()
export class DependenciesService {
  constructor(
    @InjectRepository(Dependency) private readonly dependencyRepository:Repository<Dependency>
    ){

  }
  //TODO: Asignar que el rol para entrar a estos endpoints sea el de un administrador
  async create(createDependencyDto: CreateDependencyDto) {
    
    const id=uuidv4();
    const {name}=createDependencyDto;
    const entity = Object.assign(new Dependency(),{id,name});

    try {
      const insert=await this.dependencyRepository.save(entity);
      return 'Dependencia agregada con exito!!';  
    } catch (error) {
      this.handlerDbErrors(error);
    }
    
    
    

  }

  async findAll() {
    return await this.dependencyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} dependency`;
  }

  update(id: number, updateDependencyDto: UpdateDependencyDto) {
    return `This action updates a #${id} dependency`;
  }

  remove(id: number) {
    return `This action removes a #${id} dependency`;
  }

  handlerDbErrors(error:any){
    
      if(error.code=='23505'){
        
        throw new BadRequestException ('Ya existe el registro');
      }
      else{
        throw new BadRequestException(`Problema al ingresar el registro codigo ${error.code} detalle: ${error.detail}`);
      }
  }
}
