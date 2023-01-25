import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',
    {
        unique:true
    })
    username:string;

    @Column('text',{
        select:false
    })
    password:string;

    @Column('text')
    fullName:string;

    @Column('bool',{
        default:true
    })
    isActive: boolean;

    @Column('text',{
        array:true,
        default:['user']
    })
    roles:string[];

     /* @OneToMany(
        ()=>Product,
        (product)=>product.user
    )
    product:Product; */
 
    
    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.username=this.username.toLowerCase();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
    
}

