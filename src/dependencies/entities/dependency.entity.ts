import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Dependency')
export class Dependency {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        unique:true
    })
    name:string;

    // @ManyToOne(
    //     ()=>Dependency,
    //     (dependency)=>dependency.id
    // )
    // dependency:Dependency;

    @BeforeInsert()
    checkBeforeInsert(){
        
        this.name=this.name.toLowerCase();
    }

}
